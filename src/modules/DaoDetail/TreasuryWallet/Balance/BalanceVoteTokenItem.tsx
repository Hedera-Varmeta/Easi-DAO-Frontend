import { IDAODetailResponse } from '@/api/dao';
import { formatNumber } from '@/utils/common';
import { DAO_VOTE_TYPE } from '@/utils/constants';
import { Stack, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { formatEther } from 'ethers/lib/utils';
import useBalance from 'hooks/useBalance';
import { memo, useEffect, useMemo, useState } from 'react';

type Props = {
  symbol?: string
  daoInfo?: IDAODetailResponse
}

const BalanceVoteTokenItem = ({ symbol, daoInfo }: Props) => {
  const [balance, setBalance] = useState<string | number>(0);

  const isErc20 = useMemo(() => {
    return daoInfo?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [daoInfo?.governorSettingName]);

  const balanceData = useBalance({
    contractAddress: daoInfo?.voteToken,
    ercType: daoInfo?.governorSettingName
  })

  useEffect(() => {
    if (balanceData) {
      const hexState = balanceData?.result;
      if (isErc20) setBalance(formatEther(BigNumber(hexState, 16).toFixed()));
      else setBalance(parseInt(hexState, 16));
    }
  }, [balanceData, isErc20]);

  return (
    <Stack minHeight={150} spacing="10px" py="25px" justifyContent="center">
      <Typography fontSize={13} textAlign="center" color="var(--text-des-color)">
        Balance
      </Typography>
      <Typography fontSize={30} textAlign="center" fontWeight={600}>
        {`${formatNumber(balance)} ${symbol}`}
      </Typography>
    </Stack>
  );
};

export default memo(BalanceVoteTokenItem);