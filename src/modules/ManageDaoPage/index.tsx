import { BreadCrumbComponent } from "@/components/BreadCrumbs";
import { Show } from "@/components/Show";
import { Layout } from "@/layout";
import { routeEnums } from "@/types/routes";
import { Box, Container, Divider, Link, Stack, Tab, Tabs, Typography } from "@mui/material";
import { PageComponent } from "next";
import { SyntheticEvent, useState } from "react";
import YourDaos from "./YourDaos";
import { MyMemberDAO } from "./components/MyMemberDAO";

export const ManageDaoPage: PageComponent = () => {
  const [tab, setTab] = useState<0 | 1 | 2>(0);

  const handleChange = (event: SyntheticEvent, newValue: 2 | 0 | 1) => {
    setTab(newValue);
  };

  const breadcrumbs = [
    <Link key="2" color="inherit" href={routeEnums.manageDAO}>
      <Typography fontWeight={600} fontSize={16}>
        DAOs
      </Typography>
    </Link>,
  ];

  return (
    <>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg">
        <Box
          border="1px solid #EAECF0"
          borderRadius="5px"
          p="20px"
          bgcolor="#fff"
        >
          <Stack spacing="20px">
            <Tabs
              value={tab}
              onChange={handleChange}
            >
              <Tab
                sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                label="Your Daos"
                value={0}
              />
              <Tab
                sx={{ textTransform: 'capitalize' }}
                label="Daos Membership"
                value={1}
              />
            </Tabs>

            <Divider />

            <Show when={tab === 0}>
              <YourDaos />
            </Show>
            <Show when={tab === 1}>
              <MyMemberDAO />
            </Show>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

ManageDaoPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
