import { Typography } from '@mui/material';
import React from 'react';

const ErrorHelper = ({ message }: { message?: string }) => {
  return (
    <Typography
      // className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained"
      sx={{
        color: "#FF6D60",
        fontSize: "0.75rem",
        marginLeft: '14px !important',
        marginRight: '14px !important',
        fontWeight: 400,
      }}
    >
      {message ? message : undefined}
    </Typography>
  );
};

export default ErrorHelper;