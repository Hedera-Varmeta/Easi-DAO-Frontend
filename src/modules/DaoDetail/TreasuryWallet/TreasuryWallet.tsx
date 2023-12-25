import { IDAODetailResponse, IValueResponse } from "@/api/dao";
import {
  Card,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { memo } from "react";
import Balance from "./Balance";
import TransactionHistory from "./TransactionHistory/TransactionHistory";

type Props = {
  voteSettings: IValueResponse[];
  daoInfo?: IDAODetailResponse;
};

const TreasuryWallet = ({ voteSettings, daoInfo }: Props) => {
  return (
    <Card sx={{ padding: "20px" }}>
      <Grid container spacing="40px">
        <Grid item xs={12} md={6}>
          <Balance
            voteSettings={voteSettings}
            daoInfo={daoInfo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing="20px">
            <Typography variant="h6">Transaction History </Typography>

            <TransactionHistory daoInfo={daoInfo} />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default memo(TreasuryWallet);
