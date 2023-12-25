import { useGetHederaAccountInfo, useGetHederaContractInfo } from '@/api/contract';
import { IDAODetailResponse } from '@/api/dao';
import { Show } from '@/components/Show';
import { formatNumber } from '@/utils/common';
import { Hbar, HbarUnit } from '@hashgraph/sdk';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';

type Props = {
  daoInfo?: IDAODetailResponse
}

const BalanceNativeTokenItem = ({ daoInfo }: Props) => {
  const { data, isLoading } = useGetHederaAccountInfo(daoInfo?.predictTreasury as string, {
    enabled: !!daoInfo?.predictTreasury && typeof daoInfo?.predictTreasury === 'string'
  })

  const parseBalance = useMemo(() => {
    return Hbar.from(data?.balance?.balance ?? 0, HbarUnit.Tinybar).toBigNumber().toFixed()
  }, [data?.balance?.balance])

  return (
    <Stack minHeight={150} spacing="10px" py="25px" justifyContent="center">
      <Typography fontSize={13} textAlign="center" color="var(--text-des-color)">
        Balance
      </Typography>
      <Show when={isLoading}>
        <Box display="flex" justifyContent="center">
          <Skeleton variant="rounded" height={16} width={100} />
        </Box>
      </Show>
      <Show when={!isLoading}>
        <Typography fontSize={30} textAlign="center" fontWeight={600}>
          {`${formatNumber(parseBalance)} HBAR`}
        </Typography>
      </Show>
    </Stack>
  );
};

export default memo(BalanceNativeTokenItem);