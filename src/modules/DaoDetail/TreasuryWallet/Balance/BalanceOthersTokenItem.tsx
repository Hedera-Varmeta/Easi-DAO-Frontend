import { IDAODetailResponse, ITreasury, useGetTreasuries } from "@/api/dao";
import { Empty } from "@/components/Empty";
import { Show } from "@/components/Show";
import { Box, Button, Stack } from "@mui/material";
import usePaging from "hooks/usePaging";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BalanceOtherItemView from "./BalanceOtherItemView";
import BalanceOtherViewLoading from "./BalanceOtherViewLoading";

import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import "swiper/css";
import ImportTokenModal from "../ImportTokenModal/ImportTokenModal";

type Props = {
  daoInfo?: IDAODetailResponse;
};

const BalanceOthersTokenItem = ({ daoInfo }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { query } = useRouter();
  const { id } = query;
  const [treasuries, setTreasuries] = useState<ITreasury[]>([]);
  const loadMoreContentEl = useRef<HTMLDivElement>(null);

  const { paging } = usePaging<{}>(4, {});

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetTreasuries(
      {
        limit: paging.limit as number,
        page: paging.page as number,
        daoId: Number(id),
      },
      {
        enabled: !!id,
      }
    );

  useIntersectionObserver({
    target: loadMoreContentEl,
    onIntersect: () => {
      if (!isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage,
  });

  useEffect(() => {
    let listTreasury: ITreasury[] = [];

    data?.pages?.forEach((page) => {
      listTreasury = [...listTreasury, ...page.list];
    });

    if (data?.pages) {
      setTreasuries(listTreasury ?? []);
    }
  }, [data?.pages]);

  return (
    <Stack
      minHeight={150}
      maxHeight={200}
      overflow="auto"
      display="flex"
      spacing="20px"
      py="5px"
    >
      <Show when={isLoading || treasuries.length !== 0}>
        <Box width="100%" height={120}>
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            pagination={{
              type: "fraction",
            }}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.5,
              },
              900: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
          >
            {treasuries.map((treasuryItem) => (
              <SwiperSlide key={treasuryItem.id}>
                <Box ref={loadMoreContentEl}>
                  <BalanceOtherItemView
                    tokenName={treasuryItem.tokenName}
                    contractAddress={treasuryItem.token}
                    treasuryType={treasuryItem.typeName}
                    treasuryAddress={daoInfo?.predictTreasury as string}
                    tokenId={treasuryItem.tokenId as string}
                  />
                </Box>
              </SwiperSlide>
            ))}
            {isLoading &&
              Array.from({ length: 3 }, (v, i) => i).map((loadingItem, i) => (
                <SwiperSlide key={loadingItem + i}>
                  <BalanceOtherViewLoading />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      </Show>
      <Show when={!isLoading && treasuries.length === 0}>
        <Empty my={0} imageWidth={40} imageHeight={40} flex={1} />
      </Show>
      <Stack direction="row" spacing="20px">
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            bgcolor: "var(--blue-color-70)",
            transition: "0.3s",
            "&:hover": {
              bgcolor: "var(--blue-color-70)",
              filter: "brightness(0.8)",
              transition: "0.3s",
            },
          }}
          onClick={() => setOpen(true)}
        >
          Import token
        </Button>
        <ImportTokenModal open={open} setOpen={setOpen} />
      </Stack>
    </Stack>
  );
};

export default memo(BalanceOthersTokenItem);
