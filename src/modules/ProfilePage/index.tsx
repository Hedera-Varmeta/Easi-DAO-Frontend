import { Show } from "@/components/Show";
import { Layout } from "@/layout";
import { Box, Container, Divider, Stack, Tab, Tabs } from "@mui/material";
import { PageComponent } from "next";
import { SyntheticEvent, useState } from "react";
import MyAssets from "./MyAssets/MyAssets";
import { FormProfile } from "./components/FormProfile";

export const ProfilePage: PageComponent = () => {
  const [tab, setTab] = useState<0 | 1>(0);

  const handleChange = (event: SyntheticEvent, newValue: 0 | 1) => {
    setTab(newValue);
  };

  return (
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
              label="Profile"
              value={0}
            />
            <Tab
              sx={{ textTransform: 'capitalize' }}
              label="My Assets"
              value={1}
            />
          </Tabs>

          <Divider />

          <Show when={tab === 0}>
            <FormProfile />
          </Show>
          <Show when={tab === 1}>
            <MyAssets />
          </Show>
        </Stack>
      </Box>
    </Container>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
