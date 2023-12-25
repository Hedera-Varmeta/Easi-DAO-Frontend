import { Stack, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import React, { memo, useCallback, useMemo } from 'react';

type Props = {
  totalFor: number;
  totalAgainst: number;
  totalAbstain: number;
  total: number
}

const TotalTypeVote = ({ totalAbstain, totalAgainst, totalFor, total }: Props) => {
  const getPercent = useCallback((number: number) => {
    if (total === 0) return 0;
    return +((number / total) * 100).toFixed(2)
  }, [total])

  const forPercent = useMemo(() => total === 0 ? 0 : getPercent(totalFor), [getPercent, total, totalFor])
  const abstainPercent = useMemo(() => total === 0 ? 0 : getPercent(totalAbstain), [getPercent, total, totalAbstain])
  const againstPercent = total === 0 ? 0 : 100 - forPercent - abstainPercent

  return (
    <Stack
      direction="row"
      spacing="5px"
      alignItems="center"
      flexWrap="wrap"
      divider={<div>|</div>}
    >
      <Stack direction="row" alignItems="center" spacing="5px">
        <Typography color="var(--for-vote-color)" fontWeight="bold">For:</Typography>
        <Typography color="var(--for-vote-color)">{+BigNumber(forPercent).toFixed(2)}%</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="5px">
        <Typography color="var(--against-vote-color)" fontWeight="bold">Against:</Typography>
        <Typography color="var(--against-vote-color)">{+BigNumber(againstPercent).toFixed(2)}%</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="5px">
        <Typography color="var(--abstain-vote-color)" fontWeight="bold">Abstain:</Typography>
        <Typography color="var(--abstain-vote-color)">{+BigNumber(abstainPercent).toFixed(2)}%</Typography>
      </Stack>
    </Stack>
  );
};

export default memo(TotalTypeVote);
