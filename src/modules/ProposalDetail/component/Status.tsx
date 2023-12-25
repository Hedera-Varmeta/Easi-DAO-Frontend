import { useGetDAODetail, useGetValues } from "@/api/dao";
import { IProposal, useGetDetailProposal } from "@/api/proposal";
import { useGetUserInfo } from "@/api/user";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { getLastestBlock } from "@/utils/common";
import { Box, Card, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { useGetHashProposal } from "hooks/useGetHashProposal";
import { useProposalTime } from "hooks/useProposalTime";
import { useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type Props = {
  proposal?: IProposal;
}

let timeout: NodeJS.Timer;

export const Status = ({ proposal }: Props) => {
  const router = useRouter();
  const { id, governorId } = router.query;
  const { query } = router;
  const [currentBlock, setCurrentBlock] = useState(0);
  const [proposalStart, setStart] = useState<any>();
  const [proposalEnd, setEnd] = useState<any>();
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: user } = useGetUserInfo({ enabled: !!isAuthenticator });
  const { getHashPropposal } = useGetHashProposal(200000);
  const { getProposalTime } = useProposalTime(300000, String(user?.wallet));
  // const { data: proposal } = useGetDetailProposal({ id: Number(query.id) });
  const { data: values } = useGetValues({ governorId: governorId });
  const { data: DAO } = useGetDAODetail(Number(query.daoId));

  const publishBlock = useMemo(() => {
    if (!values || !proposalStart) return "";
    const votingDelay = values?.list.find(
      (item) => item.fieldName === "initialVotingDelay"
    )?.fieldValue;
    return Number(proposalStart) - Number(votingDelay);
  }, [values, proposalStart]);

  const excuteBlock = useMemo(() => {
    if (!values || !proposalEnd) return "";
    const votingPeriod = values?.list.find(
      (item) => item.fieldName === "timelockMinDelay"
    )?.fieldValue;
    return Number(proposalEnd) + Number(votingPeriod);
  }, [values, proposalEnd]);

  // Get start and end block
  useEffect(() => {
    (async () => {
      if (!proposal || !DAO) return;
      const encodeDataUnit8Array = JSON.parse(proposal.encodeArr).map(
        (item: string) => {
          return ethers.utils.arrayify(item);
        }
      );
      const valueArray = JSON.parse(proposal.valueArr).map(
        (item: string | number) => {
          return Number(item);
        }
      );
      const hashProposal = await getHashPropposal(
        JSON.parse(proposal.addressArr),
        encodeDataUnit8Array,
        valueArray,
        ethers.utils.arrayify(
          ethers.utils.keccak256(
            // ethers.utils.toUtf8Bytes(proposal!.proposalTitle)
            ethers.utils.toUtf8Bytes(proposal.proposalTitle)
          )
        ),
        DAO?.governorAddress //governor address
      );

      const proposalTime = await getProposalTime(
        hashProposal as Uint8Array,
        proposal.governorAddress
      );

      setStart(proposalTime?.rsSnapShot);
      setEnd(proposalTime?.rsDeadline);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal, DAO]);

  // Get last block
  useEffect(() => {
    if (!excuteBlock) return;
    const getLastBlock = async () => {
      const res = await getLastestBlock();
      const lastBlock = res[0].number ?? 0;

      setCurrentBlock(lastBlock);
      if (lastBlock > excuteBlock) {
        clearInterval(timeout);
      }
    };

    if (!timeout) {
      getLastBlock();
    }
    timeout = setInterval(getLastBlock, 3000);
  }, [excuteBlock]);

  const activeStep = useMemo(() => {
    if (Number(excuteBlock) < currentBlock) return 4;
    else if (Number(proposalEnd) < currentBlock) return 3;
    return 2;
  }, [currentBlock, proposalEnd, excuteBlock]);

  if (!proposal) return null;

  return (
    <Box height="100%">
      <Card sx={{ height: '100%' }}>
        <Stack p="25px" spacing="20px" pb="40px">
          <Stack direction="row">
            <Typography variant="h4">
              Status proposal
            </Typography>
          </Stack>

          <Stepper
            // alternativeLabel
            activeStep={activeStep}
            orientation="vertical"
          >
            <Step key={0}>
              <StepLabel
                optional={
                  publishBlock ? (
                    <Typography variant="caption">
                      {`(${dayjs(+proposal?.proposalCreatedAt as number)
                        .format('ddd MMM D hh:mm:ss a')})`}
                    </Typography>
                  ) : null
                }
              >
                <Typography>
                  Published on-chain at block {publishBlock ?? "???"}
                </Typography>
              </StepLabel>
              <StepContent sx={{ pb: 3 }} />
            </Step>
            <Step key={1}>
              <StepLabel
                optional={
                  proposalStart && publishBlock ? (
                    <Typography variant="caption">
                      {`(${dayjs(+proposal?.proposalCreatedAt as number)
                        .add((Number(proposalStart) - Number(publishBlock)) * 2, 'seconds')
                        .format('ddd MMM D hh:mm:ss a')})`}
                    </Typography>
                  ) : null
                }
              >
                <Typography>
                  Voting period started at block {proposalStart ?? "???"}
                </Typography>
              </StepLabel>
              <StepContent sx={{ pb: 3 }} />
            </Step>
            <Step key={2}>
              <StepLabel
                optional={
                  proposalEnd && publishBlock ? (
                    <Typography variant="caption">
                      {`(${dayjs(+proposal?.proposalCreatedAt as number)
                        .add((Number(proposalEnd) - Number(publishBlock)) * 2, 'seconds')
                        .format('ddd MMM D hh:mm:ss a')})`}
                    </Typography>
                  ) : null
                }
              >
                <Typography>
                  End voting period at block {proposalEnd ?? "???"}
                </Typography>
              </StepLabel>
              <StepContent sx={{ pb: 3 }} />
            </Step>
            <Step key={3}>
              <StepLabel
                optional={
                  excuteBlock && publishBlock ? (
                    <Typography variant="caption">
                      {`(${dayjs(+proposal?.proposalCreatedAt as number)
                        .add((Number(excuteBlock) - Number(publishBlock)) * 2, 'seconds')
                        .format('ddd MMM D hh:mm:ss a')})`}
                    </Typography>
                  ) : null
                }>
                <Typography>
                  Execute proposal at block {excuteBlock ?? "???"}
                </Typography>
              </StepLabel>
              <StepContent sx={{ pb: 3 }} />
            </Step>
          </Stepper>
        </Stack>
      </Card>
    </Box>
  );
};
