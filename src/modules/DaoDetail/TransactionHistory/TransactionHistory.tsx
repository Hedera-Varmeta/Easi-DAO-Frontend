import { Layout } from '@/layout';
import { Box, Card, Container, Divider, Pagination, Stack, Typography } from '@mui/material';
import { PageComponent } from 'next';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { TransactionType } from '@/utils/constants';
import TransactionItem from '../TreasuryWallet/TransactionHistory/TransactionItem';
import { BreadCrumbComponent } from '@/components/BreadCrumbs';
import Link from 'next/link';
import { routeEnums } from '@/types/routes';
import { useRouter } from 'next/router';
import { ITransaction, useGetDAODetail, useGetTransactionHistory } from '@/api/dao';
import usePaging from 'hooks/usePaging';
import { Show } from '@/components/Show';
import TransactionItemLoading from '../TreasuryWallet/TransactionHistory/TransactionItemLoading';
import { Empty } from '@/components/Empty';

type Filter = {
  type: number
}

const TransactionHistory: PageComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const {
    paging,
    filter,
    handleFilterChange,
    onPageChange,
    onTotalItemsChange,
    onTotalPagesChange
  } = usePaging<Filter>(10, {
    type: TransactionType.all
  });
  const { data: daoInfo, isLoading: loadingDao } = useGetDAODetail(Number(id));

  const { data, isLoading } = useGetTransactionHistory({
    limit: paging?.limit as number,
    page: paging?.page as number,
    type: filter.type === TransactionType.all ? undefined : filter.type,
    token: daoInfo?.predictTreasury as string,
  }, { enabled: !!daoInfo?.predictTreasury })

  const onChangeType = (type: number) => {
    handleFilterChange('type', type)
    onPageChange(1)
  }

  useEffect(() => {
    if (data?.list) {
      setTransactions(data?.list)
      onTotalItemsChange(data?.pagination?.totalItems ?? 0)
      onTotalPagesChange(data?.pagination?.totalPages ?? 0)
    }
  }, [data, onTotalItemsChange, onTotalPagesChange])

  const breadcrumbs = [
    // <Link key="2" href={routeEnums.manageDAO}>
    //   <Typography fontWeight={400} fontSize={16}>
    //     DAOs
    //   </Typography>
    // </Link>,
    <Link
      key="2"
      href={`${routeEnums.detailDAO}?id=${id}&governorId=${daoInfo?.governorId}`}
    >
      <Typography fontWeight={400} fontSize={16}>
        {daoInfo?.daoName}
      </Typography>
    </Link>,
    <Link
      key="3"
      href={`${routeEnums.transactionHistoryDAO}?id=${id}&governorId=${daoInfo?.governorId}`}
    >
      <Typography fontWeight={600} fontSize={16}>
        Transaction history
      </Typography>
    </Link>
  ];

  return (
    <>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />

      <Container maxWidth="lg">
        <Stack spacing="20px">
          <Header
            currentType={filter.type}
            onChangeType={onChangeType}
          />

          <Box>
            <Container maxWidth="md">
              <Card>
                <Show when={isLoading || loadingDao}>
                  <Stack p="20px" spacing="10px" divider={<Divider />}>
                    {Array.from({ length: 5 }, (v, i) => i).map((loadingItem) => (
                      <TransactionItemLoading
                        key={loadingItem}
                      />
                    ))}
                  </Stack>
                </Show>

                <Show when={!isLoading && !loadingDao}>
                  <Stack p="20px" spacing="10px" divider={<Divider />}>
                    {transactions.map((transactionItem) => (
                      <TransactionItem
                        key={transactionItem.id}
                        predictTreasury={transactionItem.predictTreasury as string}
                        treasuryType={transactionItem.typeName}
                        type={daoInfo?.predictTreasury === transactionItem?.toAddress ? 'deposit' : 'withdraw'}
                        fromAddress={transactionItem.fromAddress}
                        toAddress={transactionItem.toAddress}
                        createdAt={+transactionItem.createdAt}
                        amount={transactionItem.amount}
                      />
                    ))}
                  </Stack>
                </Show>

                <Show when={!isLoading && !loadingDao && transactions.length === 0}>
                  <Empty />
                </Show>

                <Stack alignItems="center" my="20px">
                  <Pagination
                    defaultPage={1}
                    count={paging.totalPages ?? 0}
                    page={paging.page}
                    onChange={(e, page) => onPageChange(page as number)}
                  />
                </Stack>
              </Card>
            </Container>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default TransactionHistory;

TransactionHistory.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};