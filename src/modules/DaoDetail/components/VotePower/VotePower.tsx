import { formatNumber, prettyNumber } from "@/utils/common";
import DiamondIcon from "@mui/icons-material/Diamond";
// import PaidIcon from "@mui/icons-material/Paid";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { memo } from "react";

const VotePower = ({
  votingPower,
}: {
  votingPower: string | number;
  // balance: string | number
}) => {
  return (
    <Grid container columnSpacing={10} justifyContent="center">
      <Grid item xs={6}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack justifyContent="center" gap="5px">
            <Stack direction="row" gap="15px" alignItems="center">
              <DiamondIcon style={{ fontSize: "60px" }} color="secondary" />
              <Tooltip title={prettyNumber(+votingPower)} arrow placement="top">
                <Typography
                  color="secondary"
                  variant="h4"
                  fontWeight={600}
                  textAlign="center"
                >
                  {formatNumber(+votingPower)}
                </Typography>
              </Tooltip>
            </Stack>
            <Typography fontWeight={600} textAlign="center">
              Voting Power
            </Typography>
          </Stack>
        </Box>
      </Grid>
      {/* <Grid item xs={6}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack justifyContent="center" gap="5px">
            <Stack direction="row" gap="15px" alignItems="center">
              <PaidIcon style={{ fontSize: "60px" }} color="secondary" />
              <Typography color="secondary" variant="h4" fontWeight={600}>
                {balance}
              </Typography>
            </Stack>
            <Typography fontWeight={600} textAlign="center">
              Balance
            </Typography>
          </Stack>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default memo(VotePower);
