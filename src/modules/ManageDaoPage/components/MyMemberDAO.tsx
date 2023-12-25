import { IGetMyMemberDAOParams, useGetMyMemberDAOs } from "@/api/dao";
import { DaoItem, DaoItemLoading } from "@/components/DaoItem";
import { Empty } from "@/components/Empty";
import RefetchButton from "@/components/RefetchButton/RefetchButton";
import { Show } from "@/components/Show";
import { routeEnums } from "@/types/routes";
import { ButtonBase, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";

export const MyMemberDAO: FC = () => {
  const { push } = useRouter();
  const [params, setParams] = useState<IGetMyMemberDAOParams>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, refetch } = useGetMyMemberDAOs(params);

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };

  const onRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Stack spacing="20px">
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">DAOs Membership</Typography>
        <Stack direction="row" alignItems="center" spacing="15px">
          <RefetchButton onRefetch={onRefetch} />
        </Stack>
      </Stack>

      <Stack>
        <Grid container columnSpacing="30px" rowSpacing="50px">
          <Show when={isLoading}>
            {Array.from({ length: 9 }, (v, i) => i).map((loadingItem) => (
              <Grid item xs={12} sm={6} md={4} key={loadingItem}>
                <DaoItemLoading />
              </Grid>
            ))}
          </Show>
          <Show when={!isLoading && (data?.list ?? []).length > 0}>
            {(data?.list ?? [])?.map((daoItem) => (
              <Grid item xs={12} sm={6} md={4} key={daoItem.id}>
                <ButtonBase
                  onClick={() =>
                    push(
                      `${routeEnums.detailDAO}?id=${daoItem.id}&governorId=${daoItem.governorId}`
                    )
                  }
                  sx={{ width: "100%" }}
                >
                  <DaoItem
                    title={daoItem.daoName}
                    logo={daoItem.daoLogo}
                    createdAt={+daoItem.createdAt}
                    voteType={daoItem.governorSettingName}
                    totalMembers={+daoItem.totalHolders}
                    totalProposals={+daoItem.totalProposals}
                    totalVotes={+daoItem.totalVoters}
                    governorAddress={daoItem.governorAddress}
                    proposalLists={daoItem.proposalLists}
                  />
                </ButtonBase>
              </Grid>
            ))}
          </Show>
          <Show when={!isLoading && (data?.list ?? []).length === 0}>
            <Stack justifyContent="center" flex={1}>
              <Empty />
            </Stack>
          </Show>
        </Grid>

        <Stack alignItems="center" mt={5}>
          <Pagination
            count={data?.pagination.totalPages}
            page={params.page}
            onChange={onChangePage}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
