import { Skeleton, Stack } from '@mui/material';
import { memo } from 'react';

const TransactionItemLoading = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack spacing="5px">
        <Stack direction="row" alignItems="center" spacing="10px">
          <Skeleton width={50} height={20} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing="10px">
          <Skeleton width={50} />
          <Skeleton width={80} />
        </Stack>
        <Skeleton width={40} height={16} />
      </Stack>
      <Skeleton width={30} />
    </Stack>
  );
};

export default memo(TransactionItemLoading);
