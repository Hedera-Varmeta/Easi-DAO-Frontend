import { useGetHederaSmc } from "@/api/contract";
import { ITopDelegateDAO, createDelegate } from "@/api/dao";
import { IError } from "@/api/types";
import { useGetUserInfo } from "@/api/user";
import Address from "@/components/Address/Address";
import Avatar from "@/components/Avatar";
import {
  ERC20VotesStandard__factory,
  ERC721VotesStandard__factory,
} from "@/contracts/types";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import {
  convertToEvmAddress,
  formatNumber,
  getAccountByAddressOrAccountId,
} from "@/utils/common";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import { LoadingButton } from "@mui/lab";
import { AvatarGroup, Box, Card, Stack, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import { HederaWalletsContext } from "context/HederaContext";
import { formatEther } from "ethers/lib/utils";
import { useAppSelector } from "hooks/useRedux";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
type Props = {
  data: ITopDelegateDAO;
};

const ItemDelegate = ({ data }: Props) => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: user } = useGetUserInfo({ enabled: !!isAuthenticator });
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string | number>(0);
  const { hashConnect } = useContext(HederaWalletsContext);

  const queryClient = useQueryClient();
  const { mutate: mutateCreateDelegate } = useMutation(createDelegate, {
    onSuccess: () => {
      toast.success("Successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["/dao/top-delegate"] });
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
      setLoading(false);
    },
  });

  const isErc20 = useMemo(() => {
    return data.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [data.governorSettingName]);

  const provider = hashConnect?.getProvider(
    "testnet",
    hashConnect.hcData.topic ?? "",
    user?.accountId ?? ""
  );

  const handleDelegate = async () => {
    if (!data || !data.wallet) return;
    setLoading(true);
    const signer = hashConnect?.getSigner(provider as any);

    const voteData = await getAccountByAddressOrAccountId(data?.voteToken);
    const contractExecTx1 = await new ContractExecuteTransaction()
      .setContractId(voteData.account) // vote address
      .setGas(1000000)
      .setFunction(
        "delegate",
        new ContractFunctionParameters().addAddress(
          convertToEvmAddress(data.wallet) || ""
        )
      )
      .freezeWithSigner(signer as any);
    const contractExecSign1 = await contractExecTx1.signWithSigner(
      signer as any
    );
    try {
      const contractExecSubmit = await contractExecSign1
        .executeWithSigner(signer as any)
        .catch((e) => console.log(e, "loi"));
      if (contractExecSubmit?.transactionId) {
        const recept1 = await provider?.getTransactionReceipt(
          contractExecSubmit.transactionId.toString()
        );
        if (recept1?.status?._code === 22) {
          mutateCreateDelegate({
            balance: String(balance),
            daoId: data.daoId,
            toAddress: data.wallet,
          });
        }
      }
    } catch (error) {
      console.log("err", error);
    }
    setLoading(false);
  };

  const dataEncode = useMemo(() => {
    let factory;
    switch (data?.governorSettingName) {
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
    if (!factory || !user?.wallet) return;
    return factory.interface.encodeFunctionData("balanceOf", [user?.wallet]);
  }, [data?.governorSettingName, user?.wallet]);

  //API Get Balance
  const { data: balanceData } = useGetHederaSmc(
    {
      block: "latest",
      data: dataEncode, //hàm get mà mình sẽ gọi
      estimate: false,
      from: user?.wallet as string, //người gọi contract
      gas: 120000,
      gasPrice: 10000,
      to: data?.voteToken as string, //contract address
      value: 0,
    },
    {
      enabled: !!dataEncode && !!user?.wallet && !!data?.voteToken,
      retry: false,
    }
  );

  useEffect(() => {
    if (balanceData) {
      const hexState = balanceData?.result;
      if (isErc20) setBalance(formatEther(BigNumber(hexState, 16).toFixed()));
      else setBalance(parseInt(hexState, 16));
    }
  }, [balanceData, isErc20]);

  const renderInfo = useCallback(() => {
    if (data.username)
      return (
        <Typography
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 150,
          }}
        >
          {data.username}
        </Typography>
      );
    else if (data.accountId)
      return (
        <Typography
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 150,
          }}
        >
          {data.accountId}
        </Typography>
      );
    else
      return (
        <Address
          address={data.wallet}
          length={5}
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 100,
          }}
        />
      );
  }, [data.accountId, data.username, data.wallet]);

  const delegateInfo = useCallback(() => {
    if (!data.latestFromUsers || data.latestFromUsers.length == 0) return null;
    const avatarList = data.latestFromUsers.slice(0, 3);
    return (
      <Stack direction="row" height={13} spacing={1} alignItems="center">
        <AvatarGroup>
          {avatarList.map((item) => (
            <Avatar
              key={item?.wallet}
              username={item?.username ?? item?.wallet ?? item?.accountId ?? ""}
              avatarUrl={item?.avatarUrl}
              sx={{
                width: 20,
                height: 20,
                border: "1px solid #8364e2 !important",
              }}
            />
          ))}
        </AvatarGroup>
        <Typography
          sx={{
            color: "#6d6969",
            fontSize: 13,
          }}
        >
          Trusted by {+formatNumber(data.totalUserDelegate ?? 0)} accounts
        </Typography>
      </Stack>
    );
  }, [data.latestFromUsers, data.totalUserDelegate]);

  return (
    <Card
      sx={{
        background:
          "radial-gradient(circle, rgba(211,174,241,0.09569765406162467) 0%, rgba(196,126,249,0.07889093137254899) 38%, rgb(238 129 201 / 0%) 65%, rgb(230 161 229 / 0%) 100%)",
        backdropFilter: "blur(20px)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "var(--box-shadow-container)",
          transition: "0.3s",
          background:
            "radial-gradient(circle, rgba(211,174,241,0.09569765406162467) 0%, rgba(196,126,249,0.07889093137254899) 38%, rgba(238,129,201,0.08729429271708689) 65%, rgba(230,161,229,0.08729429271708689) 100%)",
        },
      }}
    >
      <Stack flex="1" width="100%" spacing={2} marginY={2}>
        <Box p="0 16px">
          <Stack
            direction="row"
            flex={1}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                username={data.accountId || data.wallet || data.username || ""}
                avatarUrl={data.avatarUrl}
              />
              <Stack direction="column" gap={0} alignItems="flex-start">
                {renderInfo()}
                <Typography fontWeight={500} fontSize={14} color="#6d6969">
                  {formatNumber(formatEther(data.totalBalance))}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LoadingButton
                loading={loading}
                variant="outlined"
                size="small"
                onClick={handleDelegate}
                sx={{ fontWeight: 500, height: 28, fontSize: 12 }}
              >
                Delegate
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
        <Box p="0 16px">
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              lineClamp: 3,
              WebkitBoxOrient: "vertical",
              fontWeight: 300,
              height: 50,
            }}
          >
            {data.bio || (
              <Typography color="#6d6969">No bio provided</Typography>
            )}
          </Typography>
        </Box>
        <Box p="0 16px">{delegateInfo()}</Box>
      </Stack>
    </Card>
  );
};

export default ItemDelegate;
