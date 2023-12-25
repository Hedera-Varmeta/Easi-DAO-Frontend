import { shortenAddress } from '@/utils/common';
import { Box, Stack, Typography } from '@mui/material';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (
    !active
    || !payload
    || payload.length === 0
    || !payload[0].payload.userWallet
    || !payload[0].payload.voteOptionName
    || !payload[0].payload.userVotePower) return null;

  return (
    <Stack
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      border="1px solid #EAECF0"
      zIndex={99}
      borderRadius="5px"
      p="20px"
      bgcolor="#fff"
      gap="5px"
      minWidth="200px"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">User:</Typography>
        <Typography>{shortenAddress(payload[0].payload.userWallet)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Vote Option:</Typography>
        <Typography>{payload[0].payload.voteOptionName}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Vote Power:</Typography>
        <Typography>{payload[0].payload.userVotePower}</Typography>
      </Box>
    </Stack>
  )
}

export default CustomTooltip
