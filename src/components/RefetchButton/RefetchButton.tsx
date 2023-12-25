import Refresh from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import clsx from 'clsx';

type Props = {
  onRefetch: () => void
}

let timeout: NodeJS.Timer

const RefetchButton = ({ onRefetch }: Props) => {
  const [refetching, setRefetching] = useState(false);

  const onToggleRefetching = () => {
    setRefetching(true);
    onRefetch();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setRefetching(false);
    }, 2000);
  }

  return (
    <IconButton
      disabled={refetching}
      className={clsx({
        'spin': refetching
      })}
      onClick={onToggleRefetching}
    >
      <Refresh color="secondary" />
    </IconButton>
  );
};

export default RefetchButton;