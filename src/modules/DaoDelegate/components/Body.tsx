import {
  IGetTopDelegateDAOParams,
  useGetInfinityDelegateDAOs,
} from "@/api/dao";
import { Button, Card, Grid, Stack } from "@mui/material";
import ItemDelegate from "./ItemDelegate";
import ItemLoading from "./ItemLoading";
import { Show } from "@/components/Show";

type Props = {
  params: IGetTopDelegateDAOParams;
};

const Body = ({ params }: Props) => {
  const filter: IGetTopDelegateDAOParams = {
    page: 1,
    limit: 12,
    id: params.id,
    orderBalance: params.orderBalance,
    search: params.search,
  };
  const { data, hasNextPage, fetchNextPage, isLoading } =
    useGetInfinityDelegateDAOs(filter, {
      getNextPageParam: (lastPage, _allPages) => {
        const currentPage = lastPage.pagination.currentPage;
        const totalPage = lastPage.pagination.totalPages;
        const isLastPage = currentPage === totalPage;
        if (lastPage.pagination.itemCount === 0) return undefined;
        return isLastPage ? undefined : currentPage + 1;
      },
    });

  return (
    <Grid container spacing="20px">
      {data?.pages?.map((page) =>
        page?.list?.map((item) => (
          <Grid item md={4} xs={12} key={item.wallet}>
            <ItemDelegate data={item} />
          </Grid>
        ))
      )}

      {isLoading &&
        Array.from(Array(6).keys()).map((i) => (
          <Grid item md={4} xs={12} key={i}>
            <ItemLoading />
          </Grid>
        ))}

      <Show when={(data?.pages ?? []).length > 12}>
        <Grid item xs={12}>
          <Stack
            flex={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              // variant="text"
              disabled={!hasNextPage}
              onClick={() => fetchNextPage()}
            >
              Load more
            </Button>
          </Stack>
        </Grid>
      </Show>
    </Grid>
  );
};

export default Body;
