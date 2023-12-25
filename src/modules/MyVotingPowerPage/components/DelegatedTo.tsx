import { useGetHederaSmc } from "@/api/contract";
import {
  IDAODetailResponse,
  useCheckDelegate,
  useGetDAODetail,
} from "@/api/dao";
import { ILoginResponse, useGetUserInfo } from "@/api/user";
import Address from "@/components/Address";
import Avatar from "@/components/Avatar";
import DelegateModal from "@/components/Modal/DelegateModal";
import {
  ERC20VotesStandard__factory,
  ERC721VotesStandard__factory,
} from "@/contracts/types";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { FCC } from "@/types/util.types";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { formatEther } from "ethers/lib/utils";
import { useAppSelector } from "hooks/useRedux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface Props {
  DAO?: IDAODetailResponse;
  userInfo?: ILoginResponse;
  votingPower: string | number;
}

export const DelegatedTo: FCC<Props> = ({ DAO, userInfo, votingPower }) => {
  const router = useRouter();
  const { daoId } = router.query;
  const { data } = useCheckDelegate({ daoId: Number(daoId) });
  const [balance, setBalance] = useState<string | number>(0);
  const [openDelegate, setDelegate] = useState(false);
  const delegateStatus = useMemo(() => {
    return data?.status;
  }, [data]);

  const isErc20 = useMemo(() => {
    return DAO?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [DAO?.governorSettingName]);

  const dataEncode = useMemo(() => {
    let factory;
    switch (DAO?.governorSettingName) {
      case DAO_VOTE_TYPE.ERC20_STANDARDS: //mint tokens
        // case SMC_FUNC.RELEASE_ERC20:
        factory = new ERC20VotesStandard__factory();
        break;
      case DAO_VOTE_TYPE.ERC721_STANDARDS:
        factory = new ERC721VotesStandard__factory();
        break;
      default:
        break;
    }
    if (!factory || !userInfo?.wallet) return;
    return factory.interface.encodeFunctionData("balanceOf", [
      userInfo?.wallet,
    ]);
  }, [DAO?.governorSettingName, userInfo?.wallet]);

  //API Get Balance
  const { data: balanceData } = useGetHederaSmc(
    {
      block: "latest",
      data: dataEncode, //hàm get mà mình sẽ gọi
      estimate: false,
      from: userInfo?.wallet as string, //người gọi contract
      gas: 120000,
      gasPrice: 10000,
      to: DAO?.voteToken as string, //contract address
      value: 0,
    },
    {
      enabled: !!dataEncode && !!userInfo?.wallet && !!DAO?.voteToken,
      retry: false,
    }
  );

  useEffect(() => {
    if (balanceData) {
      const hexState = balanceData?.result;
      if (isErc20) setBalance(formatEther(BigNumber(hexState, 16).toFixed()));
      else setBalance(parseInt(hexState, 16));
    }
  }, [DAO?.governorSettingName, balanceData, isErc20]);

  return (
    <Grid container mt={0.5} spacing={1}>
      <Grid item xs={6}>
        <Card>
          <Stack textAlign={"center"} padding={5} gap={3}>
            {delegateStatus === "0" && (
              <Typography sx={{ fontSize: 14 }}>Not Delegated</Typography>
            )}
            {delegateStatus === "1" && (
              <Typography>Delegated to yourself</Typography>
            )}
            {delegateStatus === "2" && (
              <Stack
                direction="row"
                alignItems="center"
                spacing="5px"
                justifyContent={"center"}
              >
                <Typography>Delegated to</Typography>
                <Avatar
                  username={data?.username || data?.accountId || ""}
                  avatarUrl={data?.avatarUrl}
                  sx={{ width: 40, height: 40 }}
                />
                <Address
                  address={data?.accountId}
                  showCopy={false}
                  length={5}
                />
              </Stack>
            )}

            <Typography variant="h5">
              {balance} {data?.symbolToken}
            </Typography>
            <Typography fontSize={16} fontWeight={300}>
              {votingPower} {data?.symbolToken} Total Voting Power
            </Typography>
          </Stack>
          {/* <Divider />
          <Box sx={{ textAlign: "center", padding: 2 }}>
            <Link href={""}>
              <Typography fontWeight={500}>View Profile</Typography>
            </Link>
          </Box> */}
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          {delegateStatus === "0" && (
            <Stack gap={2} padding={2}>
              <Typography fontWeight={600}>
                You aren&apos;t delegated!
              </Typography>
              <Typography lineHeight={1.5}>
                Tokens determine voting power in {DAO?.daoName}. They must be
                delegated before the start of the next proposal to be
                considered.
              </Typography>
              <Button variant="contained" onClick={() => setDelegate(true)}>
                Delegate
              </Button>
            </Stack>
          )}
          {delegateStatus !== "0" && (
            <Stack gap={2} padding={2}>
              <Typography fontWeight={600}>
                Considering updating your delegation?
              </Typography>
              <Typography lineHeight={1.5}>
                Your delegate&apos;s performance impacts your on-chain
                reputation. Delegate to someone who is aligned with your goals
                and actively participates.
              </Typography>
              <Button variant="contained" onClick={() => setDelegate(true)}>
                {" "}
                Update Delegation
              </Button>
            </Stack>
          )}
        </Card>
      </Grid>
      {openDelegate && (
        <DelegateModal
          open={openDelegate}
          setOpen={setDelegate}
          DAO={DAO}
          userInfo={userInfo}
          balance={balance}
        />
      )}
    </Grid>
  );
};
