import { Stack, Card, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import { TransactionTypeBox } from '../styled';
import { TransactionType } from '@/utils/constants';

type Props = {
  currentType: number
  onChangeType: (type: number) => void
}

const Header = ({ currentType, onChangeType }: Props) => {
  return (
    <Stack spacing="40px">
      <Card sx={{ padding: "20px" }}>
        <Grid container spacing="10px" alignItems="center">
          <Grid item xs={12} sm={5} md={4}>
            <Typography variant="h4">
              Transaction History
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={7} md={8} justifyContent="flex-end">
            <Grid item xs={12} sm={8}>
              <Stack
                direction="row"
                bgcolor="var(--primary-color)"
                p="5px"
                borderRadius="5px"
              >
                <TransactionTypeBox
                  onClick={() => onChangeType(TransactionType.all)}
                  active={currentType === TransactionType.all}
                >
                  All
                </TransactionTypeBox>
                <TransactionTypeBox
                  onClick={() => onChangeType(TransactionType.deposit)}
                  active={currentType === TransactionType.deposit}
                >
                  Deposit</TransactionTypeBox>
                <TransactionTypeBox
                  onClick={() => onChangeType(TransactionType.withdraw)}
                  active={currentType === TransactionType.withdraw}
                >
                  Withdraw
                </TransactionTypeBox>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default Header;