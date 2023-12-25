import { formatNumber } from '@/utils/common'
import { Card, Stack, Box, Avatar, Typography, Button, AvatarGroup, Skeleton } from '@mui/material'
import React from 'react'

type Props = {}

const ItemLoading = (props: Props) => {
  return (
    <Card sx={{
      border: '1px solid #66708530',
      '&:hover': {
        border: '1px solid #66708580'
      }
    }}>
      <Stack flex="1" width="100%" spacing={2} marginY={2}>
        <Box p="0 16px">
          <Stack direction="row" flex={1} width="100%" alignItems="center" justifyContent="space-between">
            <Stack direction="row" gap={1} alignItems="center">
              <Skeleton variant='circular' width={44} height={44} />
              <Stack direction="column" gap={0} alignItems="flex-start">
                <Skeleton variant='text' width={100} />
                <Skeleton variant='text' width={50} />
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton variant='rounded' width={80} height={30} />
            </Stack>
          </Stack>
        </Box>
        <Box p="0 16px">
          <Typography sx={{ height: 50, mt: '-4px' }}>
            <Skeleton variant='text' width="90%" />
            <Skeleton variant='text' width="90%" />
            <Skeleton variant='text' width="90%" />
          </Typography>
        </Box>
        <Box p="0 16px">
          <Stack direction="row" height={13} spacing={1} alignItems="center">
            <AvatarGroup>
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton variant='circular' width={24} height={24} />
            </AvatarGroup>
            <Skeleton variant='text' width={100} />
          </Stack>
        </Box>
      </Stack>
    </Card>
  )
}

export default ItemLoading