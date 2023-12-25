import { Grid, Stack, Typography } from '@mui/material';
import React, { HtmlHTMLAttributes, memo } from 'react';
import { VoteItemContainer } from './styled';

type Props = {
  enumSC: string,
  voteOptionName: string
  active: boolean
  onClick: () => void
}

const VoteItem = ({
  enumSC,
  voteOptionName,
  active,
  onClick,
}: Props) => {
  return (
    <VoteItemContainer
      height="80px"
      width={enumSC === "2" ? '100%' : 'calc(50% - 5px)'}
      border="1px solid #EAECF0"
      borderRadius="10px"
      justifyContent="center"
      flexDirection="column"
      bgcolor="#f4f4f4"
      enumSC={enumSC}
      active={active}
      onClick={onClick}
    >
      <Typography fontWeight="bold" textAlign="center">
        {voteOptionName}
      </Typography>
    </VoteItemContainer>
  );
};

export default memo(VoteItem);