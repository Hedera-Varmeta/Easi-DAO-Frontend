import { IGetExploreDaoResponse, useGetExploreDAO } from "@/api/dao";
import { Layout } from "@/layout";
import { Box, Container, Pagination, Stack } from "@mui/material";
import usePaging from "hooks/usePaging";
import { PageComponent } from "next";
import { useEffect, useState } from "react";
import Body from "./components/Body";
import { Header } from "./components/Header";

export type FilterExploredDaoPage = {
  daoName?: string;
  governorId?: number;
  status?: number;
};

export const ExploredDaoPage: PageComponent = () => {
  const [daos, setDaos] = useState<IGetExploreDaoResponse[]>([]);
  const {
    paging,
    filter,
    handleFilterChange,
    onPageChange,
    onTotalPagesChange,
  } = usePaging<FilterExploredDaoPage>(9, {
    daoName: undefined,
    governorId: undefined,
    status: 1,
  });
  const { data, isLoading } = useGetExploreDAO({
    daoName: filter?.daoName,
    governorId: filter?.governorId,
    limit: paging?.limit as number,
    page: paging?.page as number,
  });

  const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const onFilterChange = <TKey extends keyof FilterExploredDaoPage>(
    key: TKey,
    value: FilterExploredDaoPage[TKey]
  ) => {
    handleFilterChange(key, value);
    onPageChange(1);
  };

  useEffect(() => {
    if (data?.list) {
      setDaos(data?.list ?? []);
      onTotalPagesChange(data?.pagination?.totalPages ?? 0);
    }
  }, [data, onTotalPagesChange, paging.page]);

  return (
    <Container maxWidth="lg">
      <Box
        gap="50px"
        // boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        border="1px solid #EAECF0"
        borderRadius="5px"
        p="20px"
        bgcolor="#fff"
      >
        <Header onFilterChange={onFilterChange} />
        <Box>
          <Body list={daos} loading={isLoading} />
        </Box>

        <Stack alignItems="center">
          <Pagination
            // defaultValue={0}
            count={paging.totalPages}
            page={paging.page}
            onChange={onChange}
          />
        </Stack>
      </Box>
    </Container>
  );
};

ExploredDaoPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
