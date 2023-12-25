import { useGetHederaSmc } from "@/api/contract";
import { useGetDAODetail } from "@/api/dao";
import { useCheckVoted, useGetDetailProposal } from "@/api/proposal";
import { useGetUserInfo } from "@/api/user";
import Avatar from "@/components/Avatar";
import { VoteModal } from "@/components/Modal/components/VoteModal";
import ProposalStateLabel from "@/components/ProposalStateLabel";
import { StandardGovernor__factory } from "@/contracts/types";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { parseDate, shortenAddress } from "@/utils/common";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useGetHashProposal } from "hooks/useGetHashProposal";
import { useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ExcuteModal } from "./ExcuteModal";
import { QueueModal } from "./QueueModal";
import { useProposalTime } from "hooks/useProposalTime";
import Address from "@/components/Address";
import { FiberManualRecordOutlined } from "@mui/icons-material";

type Props = {};

const Header = (_props: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { query } = router;
  const [proposalId, setProposalId] = useState("");
  const [proposalStart, setStart] = useState<any>();

  const { data: proposal } = useGetDetailProposal({ id: Number(query.id) });
  const { data: checkVoted } = useCheckVoted({ proposalId: Number(query.id) });
  const { data: DAO } = useGetDAODetail(Number(query.daoId));

  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: user } = useGetUserInfo({ enabled: !!isAuthenticator });

  const { getHashPropposal } = useGetHashProposal(200000);
  const [proposalState, setProposalState] = useState<number>();
  const { getProposalTime } = useProposalTime(300000, String(user?.wallet));

  useEffect(() => {
    (async () => {
      if (!proposal || !DAO) return null;

      const encodeDataUnit8Array = JSON.parse(proposal.encodeArr).map(
        (item: string) => ethers.utils.arrayify(item)
      );

      const valueArray = JSON.parse(proposal.valueArr).map(
        (item: string | number) => {
          return Number(item);
        }
      );

      const hashProposal: any = await getHashPropposal(
        JSON.parse(proposal.addressArr),
        encodeDataUnit8Array,
        valueArray,
        ethers.utils.arrayify(
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposal.proposalTitle)
          )
        ),
        DAO?.governorAddress //governor address
      );

      setProposalId(hashProposal);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DAO, proposal]);

  const dataEncode = useMemo(() => {
    if (!proposalId) return null;
    const standardGovernor = new StandardGovernor__factory();
    return standardGovernor.interface.encodeFunctionData("state", [proposalId]);
  }, [proposalId]);

  const { data } = useGetHederaSmc(
    {
      block: "latest",
      data: dataEncode, //hàm get mà mình sẽ gọi
      estimate: false,
      from: user?.wallet as string, //người gọi contract
      gas: 120000,
      gasPrice: 10000,
      to: DAO?.governorAddress as string, //contract address
      value: 0,
    },
    {
      enabled: !!dataEncode && !!user?.wallet && !!DAO?.governorAddress,
      refetchInterval: proposalState !== 3 && proposalState !== 7 ? 3000 : 0,
    }
  );

  useEffect(() => {
    if (data) {
      const hexState = data?.result;
      setProposalState(parseInt(hexState, 16));
    }
  }, [data]);

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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal, DAO]);

  // const checkState = () => {
  //   (async () => {
  //     if (!proposal || !DAO) return;
  //     const encodeDataUnit8Array = JSON.parse(proposal.encodeArr).map(
  //       (item: string) => {
  //         return ethers.utils.arrayify(item);
  //       }
  //     );
  //     const valueArray = JSON.parse(proposal.valueArr).map(
  //       (item: string | number) => {
  //         return Number(item);
  //       }
  //     );
  //     const proposalData = await getHashPropposal(
  //       JSON.parse(proposal.addressArr),
  //       encodeDataUnit8Array,
  //       valueArray,
  //       ethers.utils.arrayify(
  //         ethers.utils.keccak256(
  //           // ethers.utils.toUtf8Bytes(proposal!.proposalTitle)
  //           ethers.utils.toUtf8Bytes(proposal.proposalTitle)
  //         )
  //       ),
  //       DAO?.governorAddress //governor address
  //     );

  //     const proposalState = await getProposalState(
  //       proposalData?.getBytes32(0) as any,
  //       proposal.governorAddress
  //     );
  //     setProposalState(proposalState);
  //     // console.log(proposalState);
  //     // toast.success(proposalState || "State");
  //   })();
  // };

  // const res = getLastestBlock();

  return (
    <Card sx={{ padding: "20px 25px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="20px"
      >
        <ProposalStateLabel proposalState={proposalState} size="md" />
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
          flexWrap="wrap"
        >
          <Typography
            variant="h4"
            maxWidth={1000}
            maxHeight={30}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {proposal?.proposalTitle}
          </Typography>
          <Stack direction="row" spacing={2}>
            {/* <Button onClick={checkState}> Check State</Button> */}
            {proposalState && proposalState === 4 ? (
              <QueueModal
                encodeArr={proposal?.encodeArr ?? ""}
                addressArr={proposal?.addressArr ?? ""}
                valuesArr={proposal?.valueArr ?? ""}
                governorAddress={proposal?.governorAddress ?? ""}
                proposalTitle={proposal?.proposalTitle ?? ""}
              />
            ) : null}
            {proposalState && proposalState === 5 ? (
              <ExcuteModal
                encodeArr={proposal?.encodeArr ?? ""}
                addressArr={proposal?.addressArr ?? ""}
                valuesArr={proposal?.valueArr ?? ""}
                governorAddress={proposal?.governorAddress ?? ""}
                proposalTitle={proposal?.proposalTitle ?? ""}
              />
            ) : null}
            <Box>
              {proposalState === 1 && !checkVoted && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(true)}
                >
                  Vote on Chain
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%" }} />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            username={proposal?.userWallet ?? proposal?.userAccountId ?? ""}
            avatarUrl={proposal?.userAvatarUrl}
          />
          <Stack gap={1} direction="row" alignItems="center">
            <Stack direction="row" gap="10px" alignItems="baseline">
              <Typography fontWeight="bold">By:</Typography>
              <Address
                address={proposal?.userWallet}
                fontWeight="bold"
                fontSize={18}
                length={4}
              />
            </Stack>
            <FiberManualRecordOutlined sx={{ width: 8, height: 8 }} />
            <Stack direction="row" gap="10px" alignItems="baseline">
              <Typography fontWeight="bold">Proposed on:</Typography>
              <Typography>
                {parseDate(Number(proposal?.proposalCreatedAt))}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {open && (
        <VoteModal
          open={open}
          setOpen={setOpen}
          proposal={proposal}
          daoSettingType={DAO?.governorSettingName ?? ""}
          governorAddress={DAO?.governorAddress ?? ""}
          blockStartVote={proposalStart}
        />
      )}
    </Card>
  );
};

export default Header;
