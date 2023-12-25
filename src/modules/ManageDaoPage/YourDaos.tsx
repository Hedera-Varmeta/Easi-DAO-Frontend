import React, { memo } from 'react';
import Header from './components/Header';
import { Body } from './components/Body';
import { Stack } from '@mui/material';

const YourDaos = () => {
  return (
    <Stack spacing="20px">
      <Header />
      <Body />
    </Stack>
  );
};

export default memo(YourDaos);
