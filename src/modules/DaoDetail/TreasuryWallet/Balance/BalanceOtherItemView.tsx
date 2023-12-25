import { formatNumber } from "@/utils/common";
import { TOKEN_TYPE } from "@/utils/constants";
import { Stack, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import { AbiCoder, formatEther } from "ethers/lib/utils";
import useGetSymbol from "hooks/useGetSymbol";
import useOtherTokensBalance from "hooks/useOtherTokensBalance";
import { memo, useMemo } from "react";

type Props = {
  tokenName: string;
  contractAddress: string;
  treasuryAddress: string;
  treasuryType: string;
  tokenId: string;
};

const abiDecode = new AbiCoder();

const BalanceOtherItemView = ({
  contractAddress,
  tokenName,
  treasuryType,
  treasuryAddress,
  tokenId,
}: Props) => {
  const { balanceData } = useOtherTokensBalance({
    ercType: treasuryType,
    contractAddress,
    treasuryAddress,
    tokenId,
  });

  const parseBalance = useMemo(() => {
    if (!balanceData?.result) return "0.00";
    const parse = formatEther(
      BigNumber(balanceData?.result, 16).toFixed() ?? 0
    ).toString();
    return parse;
  }, [balanceData?.result]);

  const { symbol } = useGetSymbol({
    contractAddress,
    enabled:
      (treasuryType === TOKEN_TYPE.ERC20 ||
        treasuryType === TOKEN_TYPE.ERC721) &&
      !!treasuryAddress &&
      parseBalance !== "NaN",
  });

  const parseSymbol = useMemo(() => {
    if (!symbol?.result || symbol?.result === "0x") return null;

    return symbol?.result && abiDecode.decode(["string"], symbol?.result)[0];
  }, [symbol?.result]);

  return (
    <Stack
      bgcolor="var(--secondary-color)"
      width="calc(100% - 40px)"
      height="calc(120px - 40px - 2px)"
      gap="5px"
      p="20px"
      justifyContent="center"
      alignItems="center"
      border="1px solid #EAECF0"
      borderRadius="5px"
    >
      {parseBalance === "NaN" ? (
        <Typography>Invalid address</Typography>
      ) : (
        <Typography
          fontSize={18}
          textAlign="center"
          fontWeight={600}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          display="block"
          width="100%"
        >
          {formatNumber(parseBalance)} {parseSymbol}
        </Typography>
      )}
      <Typography
        fontSize={12}
        textAlign="center"
        color="var(--text-des-color)"
      >
        {tokenName}
      </Typography>
    </Stack>
  );
};

export default memo(BalanceOtherItemView);
