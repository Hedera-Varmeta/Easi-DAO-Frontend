import { useGetDetailProposal } from "@/api/proposal";
import { Layout } from "@/layout";
import { Box, Card, Container, Stack } from "@mui/material";
import { PageComponent } from "next";
import { useRouter } from "next/router";
import { Header } from "./components/Header";
import Body from "./components/Body";
import { useState } from "react";
import FilterControl from "./components/FilterControl";
import { IGetTopDelegateDAOParams } from "@/api/dao";

export const DaoDelegatePage: PageComponent = () => {
  const { query } = useRouter();
  const [params, setParams] = useState<IGetTopDelegateDAOParams>({
    page: 1,
    limit: 1,
    id: +Number(query.id),
    orderBalance: 1,
  });

  return (
    <Container maxWidth="lg">
      <Stack gap="20px">
        <Header />
        <Card>
          <Stack gap="20px" p="20px">
            <FilterControl setParams={setParams} />
            <Body params={params} />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

DaoDelegatePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
