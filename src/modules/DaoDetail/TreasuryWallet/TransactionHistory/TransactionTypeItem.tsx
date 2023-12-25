import { Show } from '@/components/Show';
import Tag from '@/components/Tag/Tag';
import { Stack } from '@mui/material';
import { memo } from 'react';

type Props = {
  type: "deposit" | "withdraw"
}

const TransactionTypeItem = ({ type }: Props) => {
  return (
    <Stack direction="row" alignItems="center" spacing="10px">
      <Show when={type === 'deposit'}>
        <Tag title="Deposit" size="xs" bgcolor="var(--deposit-color)" textColor="#fff" />
      </Show>

      <Show when={type === 'withdraw'}>
        <Tag title="Withdraw" size="xs" bgcolor="var(--withdraw-color)" textColor="#fff" />
      </Show>
    </Stack>
  );
};

export default memo(TransactionTypeItem);
