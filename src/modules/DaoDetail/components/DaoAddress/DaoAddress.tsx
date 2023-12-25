import Address from '@/components/Address';
import { shortenAddress } from '@/utils/common';
import { Grid, Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {
  governorAddress: string;
  timelockDeterministic: string;
  voteToken: string;
  predictTreasury: string;
  loading: boolean
}

const DaoAddress = ({
  governorAddress,
  predictTreasury,
  timelockDeterministic,
  voteToken,
  loading
}: Props) => {
  return (
    <Grid container>
      <GridStyled item xs={12} md={6}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600} variant="body1">
            Governor Address:
          </Typography>
          <Typography>
            {loading ? <Skeleton variant="text" width={200} /> : <Address address={governorAddress} />}
          </Typography>
        </Stack>
      </GridStyled>
      <GridStyled item xs={12} md={6} >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600} variant="body1">
            Time Lock Address:
          </Typography>
          <Typography>
            {loading ? <Skeleton variant="text" width={200} /> : <Address address={timelockDeterministic} />}
          </Typography>
        </Stack>
      </GridStyled>
      <GridStyled item xs={12} md={6} >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600} variant="body1">
            Vote Token Address:
          </Typography>
          <Typography>
            {loading ? <Skeleton variant="text" width={200} /> : <Address address={voteToken} />}
          </Typography>
        </Stack>
      </GridStyled>
      <GridStyled item xs={12} md={6}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600} variant="body1">
            Treasury Address:
          </Typography>
          <Typography>
            {loading ? <Skeleton variant="text" width={200} /> : <Address address={predictTreasury} />}
          </Typography>
        </Stack>
      </GridStyled>
    </Grid>
  );
};

export default memo(DaoAddress);

export const GridStyled = styled(Grid)(({ theme }) => ({
  backgroundColor: '#F6F6F699',
  border: '1px solid #ffffff',
  padding: 8,
}));