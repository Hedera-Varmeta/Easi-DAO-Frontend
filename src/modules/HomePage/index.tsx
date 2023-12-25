import { Layout } from "@/layout";
import { routeEnums } from "@/types/routes";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { PageComponent } from "next";
import Animate from "./components/Animate";
import Link from "next/link";

export const HomePage: PageComponent = () => {
  return (
    <Container maxWidth="lg">
      <Box
        p={{ xs: '20px', sm: '40px' }}
        minHeight={500}
        position="relative"
        sx={{ transform: 'translateY(-5%)' }}
      >
        <Stack flexDirection="row" justifyContent="center">
          <Animate />
        </Stack>
        <Typography variant="h1" textAlign="center" color="primary.main">
          Explore the DAO World
        </Typography>
        <Typography textAlign="center" fontSize={20} mt="40px">
          DAO creation and management platform with no coding required
        </Typography>
        <Typography textAlign="center" fontSize={20} mt="20px">
          Explore communities, and find inspiration for your project all in one place.
        </Typography>
        <Box mt="40px" display="flex" justifyContent="center">
          <Link href={routeEnums.exploredDAO}>
            <Button variant="contained" color="primary" size="large">
              Explore DAOs
            </Button>
          </Link>
        </Box>
        {/* <Grid container columns={12} alignItems="center" m="auto">
          <Left></Left>
          <Right></Right>
        </Grid> */}
      </Box>
    </Container>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
