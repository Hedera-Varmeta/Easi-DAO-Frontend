import { Button, Divider, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import { IDAODetailResponse, ITransaction, useGetDAODetail, useGetTransactionHistory } from '@/api/dao';
import { useRouter } from 'next/router';
import usePaging from 'hooks/usePaging';
import { routeEnums } from '@/types/routes';
import Link from 'next/link';
import { Show } from '@/components/Show';
import TransactionItemLoading from './TransactionItemLoading';
import { TransactionType } from '@/utils/constants';
import { Empty } from '@/components/Empty';

type Props = {
  daoInfo?: IDAODetailResponse;
}

type Filter = {
  type: number
}

const TransactionHistory = ({ daoInfo }: Props) => {
  const { query } = useRouter()
  const { id } = query
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const {
    paging,
    filter,
    onTotalItemsChange,
  } = usePaging<Filter>(3, {
    type: TransactionType.all
  });

  const { data, isLoading } = useGetTransactionHistory({
    limit: paging?.limit as number,
    page: paging?.page as number,
    type: filter.type === TransactionType.all ? undefined : filter.type,
    token: daoInfo?.predictTreasury as string,
  }, { enabled: !!daoInfo?.predictTreasury })

  useEffect(() => {
    if (data?.list) {
      setTransactions(data?.list)
      onTotalItemsChange(data?.pagination?.totalItems ?? 0)
    }
  }, [data, onTotalItemsChange])

  return (
    <Stack spacing="10px">
      <Show when={isLoading}>
        <Stack spacing="5px" divider={<Divider />}>
          {Array.from({ length: 3 }, (v, i) => i).map((loadingItem) => (
            <TransactionItemLoading
              key={loadingItem}
            />
          ))}
        </Stack>
      </Show>
      <Show when={!isLoading && transactions.length === 0}>
        <Stack minHeight={250} justifyContent="center">
          <Empty />
        </Stack>
      </Show>
      <Show when={!isLoading}>
        <Stack spacing="5px" divider={<Divider />}>
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
      <Show when={!isLoading && transactions.length > 0}>
        <Link prefetch href={`${routeEnums.transactionHistoryDAO}?id=${id}&governorId=${daoInfo?.governorId}`}>
          <Button fullWidth>
            View all
          </Button>
        </Link>
      </Show >
    </Stack >
  );
};

export default TransactionHistory;