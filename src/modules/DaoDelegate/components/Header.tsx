import { useGetHederaSmc } from "@/api/contract";
import { useGetDAODetail } from "@/api/dao";
import { useGetUserInfo } from "@/api/user";
import Address from "@/components/Address/Address";
import Avatar from "@/components/Avatar";
import {
  ERC20VotesStandard__factory,
  ERC721VotesStandard__factory,
} from "@/contracts/types";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import { FiberManualRecordOutlined } from "@mui/icons-material";
import {
  Card,
  Chip,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { formatEther } from "ethers/lib/utils";
import { useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export const Header = () => {

  const router = useRouter();
  const { id } = router.query;
  const { data: DAO } = useGetDAODetail(Number(id));
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });
  const [supply, setSupply] = useState<string | number>(0);
  const isErc20 = useMemo(() => {
    return DAO?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [DAO?.governorSettingName]);

  const dataEncodeSupply = useMemo(() => {
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
    if (!factory) return;
    return factory.interface.encodeFunctionData("totalSupply", []);
  }, [DAO?.governorSettingName]);

  //API Get DAO Supply
  const { data: DaoSupply } = useGetHederaSmc(
    {
      block: "latest",
      data: dataEncodeSupply, //hàm get mà mình sẽ gọi
      estimate: false,
      from: userInfo?.wallet as string, //người gọi contract
      gas: 120000,
      gasPrice: 10000,
      to: DAO?.voteToken as string, //contract address
      value: 0,
    },
    {
      enabled: !!dataEncodeSupply && !!userInfo?.wallet && !!DAO?.voteToken,
      retry: false,
    }
  );

  useEffect(() => {
    if (DaoSupply) {
      const supply = DaoSupply?.result;
      if (isErc20) setSupply(formatEther(BigNumber(supply, 16).toFixed()));
      else setSupply(parseInt(supply, 16));
    }
  }, [DAO?.governorSettingName, DaoSupply, isErc20]);


  return (
    <Card sx={{ padding: "20px" }}>
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
        flexWrap="wrap"
      >
        <Stack spacing={1} direction="row" alignItems="center">
          <Avatar
            username={DAO?.daoName ?? ''}
            avatarUrl={DAO?.daoLogo}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="h4">{DAO?.daoName}</Typography>
          <Stack flexDirection={"row"} gap={1}>
            <Chip label={isErc20 ? "ERC20" : "ERC721"} color="primary" />
            <Chip label={`${supply} supply`} color="info" />
          </Stack>
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
          <Stack direction="row" gap="5px" alignItems="center" >
            <Typography fontSize={12} fontWeight="bold">By:</Typography>
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
            <Typography fontSize={12} fontWeight="bold">Account ID:</Typography>
            <Typography fontSize={12}>
              {DAO?.userAccountId}
            </Typography>
          </Stack>
          <FiberManualRecordOutlined sx={{ width: 8, height: 8 }} />
          <Stack direction="row" gap="10px" alignItems="baseline">
            <Typography fontSize={12} fontWeight="bold">Created at:</Typography>
            <Typography fontSize={12}>
              {dayjs(Number(DAO?.createdAt ?? 0)).format('ddd, DD MMM YYYY')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
