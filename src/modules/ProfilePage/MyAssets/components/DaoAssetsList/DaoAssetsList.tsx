import { Show } from '@/components/Show';
import { Box, Grid, Link, Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DaoAssetItem, DaoItemLoading } from '../DaoAssetItem';
import { routeEnums } from '@/types/routes';
import { Empty } from '@/components/Empty';
import { IDAOResponse, IGetMyDAOParams, useGetMyDAO } from '@/api/dao';
import usePaging from 'hooks/usePaging';

type Props = {
  onChooseDaoAsset: (item: IDAOResponse) => void
}

const DaoAssetsList = ({ onChooseDaoAsset }: Props) => {
  const [daosAsset, setDaosAsset] = useState<IDAOResponse[]>([])
  const { paging, filter, onPageChange, onTotalPagesChange } = usePaging(9, { status: 1 })

  const { data, isLoading } = useGetMyDAO({
    limit: paging.limit as number,
    page: paging.page as number,
    status: filter.status
  });

  useEffect(() => {
    if (data?.list) {
      onTotalPagesChange(data?.pagination?.totalPages)
      setDaosAsset(data?.list ?? [])
    }
  }, [data?.list, data?.pagination?.totalPages, onTotalPagesChange])

  return (
    <Stack spacing="20px">
      <Grid container spacing={2}>
        <Show when={isLoading}>
          {Array.from({ length: 9 }, (v, i) => i).map((loadingItem) => (
            <Grid item xs={12} sm={6} md={4} key={loadingItem}>
              <DaoItemLoading />
            </Grid>
          ))}
        </Show>
        <Show when={!isLoading && daosAsset.length > 0}>
          {daosAsset?.map((daoItem) => (
            <Grid item xs={12} sm={6} md={4} key={daoItem.id}>
              <Box onClick={() => onChooseDaoAsset(daoItem)}>
                <DaoAssetItem
                  title={daoItem.daoName}
                  logo={daoItem.daoLogo}
                  createdAt={+daoItem.createdAt}
                  voteType={daoItem.governorSettingName}
                  totalMembers={+daoItem.totalHolders}
                  totalProposals={+daoItem.totalProposals}
                  totalVotes={+daoItem.totalVoters}
                />
              </Box>
            </Grid>
          ))}
        </Show>
        <Show when={!isLoading && daosAsset.length === 0}>
          <Stack justifyContent="center" flex={1}>
            <Empty />
          </Stack>
        </Show>
      </Grid>

      <Stack alignItems="center">
        <Pagination
          count={paging.totalPages}
          page={paging.page}
          onChange={(e, newPage) => onPageChange(newPage)}
        />
      </Stack>
    </Stack>
  );
};

export default DaoAssetsList;