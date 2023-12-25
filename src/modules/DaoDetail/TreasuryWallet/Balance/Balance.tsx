import { Show } from "@/components/Show";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import BalanceOthersTokenItem from "./BalanceOthersTokenItem";
import BalanceVoteTokenItem from "./BalanceVoteTokenItem";
import { IDAODetailResponse, IValueResponse } from "@/api/dao";
import { BalanceContainer, BalanceWalletItem } from "../styled";
import BalanceNativeTokenItem from "./BalanceNativeTokenItem";

const Balances = {
  NativeTokenBalance: "nativeTokenBalance",
  VoteTokenBalance: "voteTokenBalance",
  OtherTokenBalance: "otherTokenBalance",
};

type Props = {
  voteSettings: IValueResponse[];
  daoInfo?: IDAODetailResponse;
};

const Balance = ({ voteSettings, daoInfo }: Props) => {
  const [currentBalance, setCurrentBalance] = useState(
    Balances.NativeTokenBalance
  );

  const onChangeCurrentBalance = (balanceType: string) => {
    setCurrentBalance(balanceType);
  };

  const symbol = useMemo(() => {
    if (voteSettings.length === 0) return "";

    return voteSettings.find((v) => v.fieldName === "symbol")?.fieldValue;
  }, [voteSettings]);

  return (
    <BalanceContainer>
      <Stack spacing="20px">
        <Typography variant="h6">Treasury Wallet</Typography>
        <Stack
          direction="row"
          p="5px"
          bgcolor="var(--primary-color)"
          borderRadius="5px"
        >
          <BalanceWalletItem
            active={currentBalance === Balances.NativeTokenBalance}
            onClick={() => onChangeCurrentBalance(Balances.NativeTokenBalance)}
          >
            Native Balance
          </BalanceWalletItem>
          <BalanceWalletItem
            active={currentBalance === Balances.VoteTokenBalance}
            onClick={() => onChangeCurrentBalance(Balances.VoteTokenBalance)}
          >
            Vote Balance
          </BalanceWalletItem>
          <BalanceWalletItem
            active={currentBalance === Balances.OtherTokenBalance}
            onClick={() => onChangeCurrentBalance(Balances.OtherTokenBalance)}
          >
            Other Balances
          </BalanceWalletItem>
        </Stack>
        <Box>
          <Show when={currentBalance === Balances.NativeTokenBalance}>
            <BalanceNativeTokenItem daoInfo={daoInfo} />
          </Show>
          <Show when={currentBalance === Balances.VoteTokenBalance}>
            <BalanceVoteTokenItem symbol={symbol} daoInfo={daoInfo} />
          </Show>
          <Show when={currentBalance === Balances.OtherTokenBalance}>
            <BalanceOthersTokenItem daoInfo={daoInfo} />
          </Show>
        </Box>
      </Stack>
    </BalanceContainer>
  );
};

export default Balance;
