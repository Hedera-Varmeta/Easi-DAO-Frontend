import { useGetTopDelegateDAOs } from "@/api/dao";
import { Empty } from "@/components/Empty";
import ItemDelegate from "@/modules/DaoDelegate/components/ItemDelegate";
import ItemLoading from "@/modules/DaoDelegate/components/ItemLoading";
import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const DaoDelegate = (props: Props) => {
  const { query } = useRouter();
  const { data, isLoading } = useGetTopDelegateDAOs({
    page: 1,
    limit: 3,
    id: Number(query.id),
    orderBalance: 1,
  });
  return (
    <Card sx={{ padding: "16px", mt: 4 }}>
      <Stack gap={2}>
        <Typography variant="h5">Trending Delegates</Typography>
        <Divider />
        <Grid container columnSpacing={1.5} rowSpacing={1.5}>
          {data &&
            data?.list &&
            data?.list.map((item, index) => (
              <Grid item sm={4} xs={12} key={item.wallet}>
                <ItemDelegate data={item} />
              </Grid>
            ))}

          {data && data?.list.length === 0 && (
            <Grid item sm={12} xs={12}>
              <Empty />
            </Grid>
          )}

          {isLoading &&
            Array.from(Array(3).keys()).map((i) => (
              <Grid item sm={4} xs={12} key={i}>
                <ItemLoading />
              </Grid>
            ))}

          <Grid item xs={12}>
            <Stack
              flex={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Link href={`/dao-delegate?id=${query.id}`}>
                <Button variant="contained">Explore all delegates</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default DaoDelegate;
