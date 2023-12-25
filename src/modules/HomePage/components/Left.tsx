import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useWindowSize } from "hooks/useWindowSize";
import { routeEnums } from "@/types/routes";
import Link from "next/link";

export const Left = () => {
  const { width } = useWindowSize();
  return (
    <Grid item md={6} xs={12}>
      <Stack spacing={4} height="100%" justifyContent="flex-end">
        <Typography
          variant="h6"
          color="secondary"
          textTransform="uppercase"
          fontWeight={800}
        >
          Welcome to VarMeta
        </Typography>
        <Typography variant="h1">
          Create, sell or collect <br /> digital items.
        </Typography>
        <Typography variant="h5" sx={{ color: "#727272" }}>
          Unit of data stored on a digital ledger, called a blockchain, that
          certifies a digital asset to be unique and therefore not
          interchangeable
        </Typography>
        <Box>
          <Button variant="contained" size="large">
            Get Started
          </Button>
          <Link href={routeEnums.exploredDAO}>
            <Button variant="contained" color="primary" size="large" sx={{ ml: 2 }}>
              Explore DAOs
            </Button>
          </Link>
        </Box>
      </Stack>
    </Grid>
  );
};
