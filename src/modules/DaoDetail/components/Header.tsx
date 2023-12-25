import { useGetDAODetail, useGetValues, useGetVoteValue } from "@/api/dao";
import { useGetUserInfo } from "@/api/user";
import Address from "@/components/Address/Address";
import Avatar from "@/components/Avatar";
import { Markdown } from "@/components/Mardown";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { routeEnums } from "@/types/routes";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import { FiberManualRecordOutlined } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { formatEther } from "ethers/lib/utils";
import useDaoSupply from "hooks/useDaoSupply";
import { useGetVotingPower } from "hooks/useGetVotingPower";
import { useAppSelector } from "hooks/useRedux";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import TreasuryWallet from "../TreasuryWallet";
import Tag from "@/components/Tag/Tag";
import { formatNumber, prettyNumber } from "@/utils/common";

const VotePower = dynamic(() => import("./VotePower"), { ssr: false });
const DaoAddress = dynamic(() => import("./DaoAddress"), { ssr: false });
const ContractParams = dynamic(() => import("./ContractParams"), {
  ssr: false,
});

let timeout: NodeJS.Timer;

export const Header = () => {
  const router = useRouter();
  const { id, governorId } = router.query;
  const { data: DAO, isLoading: loadingDao } = useGetDAODetail(Number(id));
  // const { hashConnect } = useContext(HederaWalletsContext);
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });
  // const [mintType, setMintType] = useState<string>("ERC20VotesStandard");
  const [supply, setSupply] = useState<string | number>(0);
  const [votingPower, setVotingPower] = useState<number | string>(0);
  const isErc20 = useMemo(() => {
    return DAO?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [DAO?.governorSettingName]);

  const { getVotingPower } = useGetVotingPower();
  const { data: values } = useGetValues({ governorId: governorId });
  const { data: voteValues } = useGetVoteValue({ governorId: governorId });

  const daoSupplyData = useDaoSupply({
    contractAddress: DAO?.voteToken,
    ercType: DAO?.governorSettingName,
  });

  useEffect(() => {
    if (daoSupplyData) {
      const supply = daoSupplyData?.result;
      if (isErc20) setSupply(formatEther(BigNumber(supply, 16).toFixed()));
      else setSupply(parseInt(supply, 16));
    }
  }, [daoSupplyData, isErc20]);

  useEffect(() => {
    if (!DAO?.governorAddress || !userInfo?.wallet) return;

    const getVotePowerFunc = async () => {
      const res = await getVotingPower(
        100000,
        userInfo?.wallet || "",
        DAO?.governorAddress
      );

      if (isErc20) setVotingPower(formatEther(BigNumber(res).toFixed()));
      else setVotingPower(Number(res));
    };

    if (!timeout) {
      getVotePowerFunc();
    }
    timeout = setInterval(getVotePowerFunc, 3000);

    return () => {
      clearInterval(timeout);
    };
  }, [
    DAO?.governorAddress,
    DAO?.governorSettingName,
    getVotingPower,
    isErc20,
    userInfo,
  ]);

  return (
    <Stack spacing="40px">
      <Card sx={{ padding: "20px" }}>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
          flexWrap="wrap"
        >
          <Stack gap={1}>
            <Stack flexDirection={"row"} gap={1}>
              <Tag
                bgcolor={
                  isErc20 ? "var(--primary-color)" : "var(--blue-color-70)"
                }
                title={isErc20 ? "ERC20" : "ERC721"}
                textColor="#fff"
              />
              <Tooltip
                title={`${prettyNumber(supply)} supply`}
                placement="top"
                arrow
              >
                <div>
                  <Tag title={`${formatNumber(supply)} supply`} />
                </div>
              </Tooltip>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              <Avatar
                username={DAO?.daoName ?? ""}
                avatarUrl={DAO?.daoLogo}
                sx={{ width: 56, height: 56 }}
              />
              <Typography
                variant="h4"
                maxWidth={800}
                maxHeight={30}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
              >
                {DAO?.daoName}
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} direction="row">
            <Link href={`${routeEnums.myVotingPower}?daoId=${DAO?.id}`}>
              <Button variant="contained" size="large">
                My voting power
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Divider style={{ marginTop: "10px" }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          style={{ marginTop: "10px" }}
        >
          <Stack gap={1} direction="row" alignItems="center">
            <Stack direction="row" gap="5px" alignItems="center">
              <Typography fontSize={12} fontWeight="bold">
                By:
              </Typography>
              <Avatar
                username={DAO?.userWallet ?? DAO?.userAccountId ?? ""}
                avatarUrl={DAO?.userAvatarUrl}
                sx={{ width: 24, height: 24 }}
              />
              <Address
                address={DAO?.userWallet}
                fontWeight="500"
                fontSize={12}
                length={6}
              />
            </Stack>
            <FiberManualRecordOutlined sx={{ width: 8, height: 8 }} />
            <Stack direction="row" gap="10px" alignItems="baseline">
              <Typography fontSize={12} fontWeight="bold">
                Account ID:
              </Typography>
              <Typography fontSize={12}>{DAO?.userAccountId}</Typography>
            </Stack>
            <FiberManualRecordOutlined sx={{ width: 8, height: 8 }} />
            <Stack direction="row" gap="10px" alignItems="baseline">
              <Typography fontSize={12} fontWeight="bold">
                Created at:
              </Typography>
              <Typography fontSize={12}>
                {dayjs(Number(DAO?.createdAt ?? 0)).format("ddd, DD MMM YYYY")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>

      <TreasuryWallet voteSettings={voteValues?.list ?? []} daoInfo={DAO} />

      <Card sx={{ padding: "20px" }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            style={{ padding: 0 }}
          >
            <Typography variant="h6">DAO Address</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DaoAddress
              loading={loadingDao}
              governorAddress={DAO?.governorAddress ?? ""}
              predictTreasury={DAO?.predictTreasury ?? ""}
              timelockDeterministic={DAO?.timelockDeterministic ?? ""}
              voteToken={DAO?.voteToken ?? ""}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: "20px" }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            style={{ padding: 0 }}
          >
            <Typography variant="h6">Voting Power</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <VotePower
              votingPower={votingPower}
              // balance={balance}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: "20px" }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            style={{ padding: 0 }}
          >
            <Typography variant="h6">Contract Parameters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ContractParams
              governorSettings={values?.list ?? []}
              voteSettings={voteValues?.list ?? []}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ marginTop: "20px" }} defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            style={{ padding: 0 }}
          >
            <Typography variant="h6">DAO Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Markdown onlyView value={DAO?.daoDescription} />
          </AccordionDetails>
        </Accordion>
      </Card>
    </Stack>
  );
};
