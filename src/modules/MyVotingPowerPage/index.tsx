import { Layout } from "@/layout";
import {
  Card,
  Container,
  Divider,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PageComponent } from "next";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { DelegatedTo } from "./components/DelegatedTo";
import { ReceviedDelegations } from "./components/ReceviedDelegations";
import { BreadCrumbComponent } from "@/components/BreadCrumbs";
import { useRouter } from "next/router";
import { useGetDAODetail } from "@/api/dao";
import { useAppSelector } from "hooks/useRedux";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { useGetUserInfo } from "@/api/user";
import { useGetVotingPower } from "hooks/useGetVotingPower";
import { formatEther } from "ethers/lib/utils";
import BigNumber from "bignumber.js";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import { routeEnums } from "@/types/routes";

let timeout: NodeJS.Timer;

export const MyVotingPowerPage: PageComponent = () => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });
  const router = useRouter();
  const { daoId } = router.query;
  const { data: DAO } = useGetDAODetail(Number(daoId));
  const [votingPower, setVotingPower] = useState<number | string>(0);
  const { getVotingPower } = useGetVotingPower();

  const isErc20 = useMemo(() => {
    return DAO?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [DAO?.governorSettingName]);

  const [tab, setTab] = useState<0 | 1 | 2>(0);
  const handleChange = (event: SyntheticEvent, newValue: 2 | 0 | 1) => {
    setTab(newValue);
  };

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

  const breadcrumbs = [
    // <Link key="2" color="inherit" href={routeEnums.manageDAO}>
    //   <Typography fontWeight={400} fontSize={16}>
    //     DAOs
    //   </Typography>
    // </Link>,
    <Link
      key="2"
      color="inherit"
      href={`${routeEnums.detailDAO}?id=${daoId}&governorId=${DAO?.governorId}`}
    >
      <Typography fontWeight={400} fontSize={16}>
        {DAO?.daoName}
      </Typography>
    </Link>,
    <Typography key="3" fontWeight={600} fontSize={16}>Voting Power</Typography>,
  ];

  return (
    <>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg">
        <Card>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            padding={2}
          >
            <Typography variant="h4">Voting power</Typography>
          </Stack>
          <Divider />
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontWeight: 600, color: "#111111", fontSize: 13 }}
              label="Delegated to"
              value={0}
            />
            <Tab
              sx={{ fontWeight: 600, color: "#111111", fontSize: 13 }}
              label="Received Delegations"
              value={1}
            />
          </Tabs>
        </Card>
        {tab === 0 && (
          <DelegatedTo
            DAO={DAO}
            userInfo={userInfo}
            votingPower={votingPower}
          />
        )}
        {tab === 1 && (
          <ReceviedDelegations
            votingPower={votingPower}
            symbolToken={DAO?.symbolToken || ""}
          />
        )}
      </Container>
    </>
  );
};

MyVotingPowerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
