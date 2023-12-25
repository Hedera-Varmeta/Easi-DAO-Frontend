import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { FCC } from '@/types/util.types';
import { Box } from '@mui/material';
import { Show } from '../Show';

type Props = {
  loading: boolean
}

const OverlayPage: FCC<Props> = ({ loading, children }) => {
  return (
    <Box>
      <Show when={loading}>
        <Box
          position="fixed"
          width="100%"
          height="100%"
          bgcolor="#0000006d"
          top={0}
          left={0}
          zIndex={9999}
          display="flex" justifyContent="center" alignItems="center"
          sx={{
            backdropFilter: 'blur(5px)',
          }}
        >
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      </Show>
      {children}
    </Box>
  );
};

export default OverlayPage;