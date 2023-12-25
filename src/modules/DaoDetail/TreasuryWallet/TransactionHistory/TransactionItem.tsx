import { Stack, Tooltip, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import TransactionTypeItem from "./TransactionTypeItem";
import { formatNumber, prettyNumber, shortenAddress } from "@/utils/common";
import dayjs from "dayjs";
import BigNumber from "bignumber.js";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Tag from "@/components/Tag";
import useGetSymbol from "hooks/useGetSymbol";
import { TOKEN_TYPE } from "@/utils/constants";
import { AbiCoder } from "ethers/lib/utils";
import { Show } from "@/components/Show";

type Props = {
  predictTreasury: string;
  treasuryType: string;
  type: "deposit" | "withdraw";
  fromAddress: string;
  toAddress: string;
  createdAt: number;
  amount: string;
};

const abiDecode = new AbiCoder();

const TransactionItem = ({
  type,
  treasuryType,
  fromAddress,
  toAddress,
  createdAt,
  amount,
  predictTreasury,
}: Props) => {
  const { symbol } = useGetSymbol({
    contractAddress: predictTreasury,
    enabled:
      treasuryType === TOKEN_TYPE.ERC20 || treasuryType === TOKEN_TYPE.ERC721,
  });

  const parseSymbol = useMemo(() => {
    if (!symbol?.result || symbol?.result === "0x") return "";

    return symbol?.result && abiDecode.decode(["string"], symbol?.result)[0];
  }, [symbol?.result]);

  const getBalance = useMemo(() => {
    const first = type === "deposit" ? "+" : "-";

    if (treasuryType === TOKEN_TYPE.ERC1155) return `${first} 1`;
    if (treasuryType === TOKEN_TYPE.ERC20)
      return `${first} ${formatNumber(amount)} ${parseSymbol}`;
    return `${first} 1 ${parseSymbol}`;
  }, [amount, parseSymbol, treasuryType, type]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack spacing="5px">
        <Stack direction="row" alignItems="center" spacing="10px">
          <TransactionTypeItem type={type} />
          <Tag title={treasuryType} size="xs" />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing="10px"
          flexWrap="wrap"
        >
          <Stack direction="row" alignItems="center" spacing="10px">
            <Typography fontSize={12} fontStyle="italic">
              From:
            </Typography>
            <Tooltip title={fromAddress} placement="top" arrow>
              <Typography
                fontSize={12}
                color="var(--blue-color-70)"
                fontStyle="italic"
              >
                {shortenAddress(fromAddress)}
              </Typography>
            </Tooltip>
          </Stack>
          <ArrowRightAltIcon />
          <Stack direction="row" alignItems="center" spacing="10px">
            <Typography fontSize={12} fontStyle="italic">
              To:
            </Typography>
            <Tooltip title={toAddress} placement="top" arrow>
              <Typography
                fontSize={12}
                color="var(--blue-color-70)"
                fontStyle="italic"
              >
                {shortenAddress(toAddress)}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
        <Typography
          color="var(--text-des-color)"
          fontSize={12}
          fontStyle="italic"
        >
          {`Created at: ${dayjs(createdAt).format("MMM D, YYYY h:mm A")}`}
        </Typography>
      </Stack>
      <Stack spacing="5px">
        <Typography fontWeight="bold" fontSize={16}>
          {getBalance}
        </Typography>
        <Show when={treasuryType === TOKEN_TYPE.ERC721}>
          <Typography
            fontSize={12}
            textAlign="center"
            color="var(--text-des-color)"
          >
            {`(TokenId: ${amount})`}
          </Typography>
        </Show>
      </Stack>
    </Stack>
  );
};

export default memo(TransactionItem);
