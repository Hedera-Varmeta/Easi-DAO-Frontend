import { IGetExploreDaoResponse } from "@/api/dao";
import { DaoItem, DaoItemLoading } from "@/components/DaoItem";
import { Empty } from "@/components/Empty";
import { Show } from "@/components/Show";
import { getIsAuthenticator, toggleLoginModal } from "@/store/ducks/auth/slice";
import { routeEnums } from "@/types/routes";
import { Box, ButtonBase, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

type Props = {
  list: IGetExploreDaoResponse[];
  loading: boolean;
};

const Body = ({ list, loading }: Props) => {
  const dispatch = useAppDispatch();
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const isLoggedIn = !!isAuthenticator;
  const { push } = useRouter();

  const handleDirect = async (href: string) => {
    if (isLoggedIn) {
      return await push(href);
    }

    dispatch(toggleLoginModal([true, "login"]));
  };

  return (
    <Box pb="50px">
      <Grid container columnSpacing="30px" rowSpacing="50px">
        <Show when={loading}>
          {Array.from({ length: 9 }, (v, i) => i).map((loadingItem) => (
            <Grid item xs={12} sm={6} md={4} key={loadingItem}>
              <DaoItemLoading />
            </Grid>
          ))}
        </Show>
        <Show when={!loading && list.length > 0}>
          {list?.map((daoItem) => (
            <Grid item xs={12} sm={6} md={4} key={daoItem.id}>
              <ButtonBase
                onClick={() =>
                  handleDirect(
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
        <Show when={!loading && (list ?? []).length === 0}>
          <Empty />
        </Show>
      </Grid>
    </Box>
  );
};

export default memo(Body);
