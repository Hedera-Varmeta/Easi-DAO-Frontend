import { ICommentProposalResponse } from '@/api/proposal'
import Address from '@/components/Address/Address'
import Avatar from '@/components/Avatar'
import { Box, Card, Chip, Divider, Stack, TableCell, TableRow, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'
import TimeLive from './TimeLive'
import { VoteChip } from '@/components/VoteChip'
import { CancelOutlined, Check, DoneAll, DoneAllOutlined, SentimentNeutralOutlined } from '@mui/icons-material'

type Props = {
  data: ICommentProposalResponse
}

const CommentsItem = ({ data }: Props) => {
  const memberInfo = useCallback(() => {
    if (data.userUsername)
      return <Typography
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 300
        }}>
        {data.userUsername}
      </Typography>
    else if (data.userAccountId)
      return <Typography
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 300
        }}>
        {data.userAccountId}
      </Typography>
    else
      return <Address
        address={data.userWallet}
        length={5}
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 300
        }} />
  }, [data.userAccountId, data.userUsername, data.userWallet])

  const renderIcon = useCallback(
    () => data.enumSC == 1
      ? <DoneAllOutlined sx={{ width: 20, height: 20 }} />
      : data.enumSC == 2
        ? <SentimentNeutralOutlined sx={{ width: 20, height: 20 }} />
        : <CancelOutlined sx={{ width: 20, height: 20 }} />
    , [data.enumSC])

  return (
    <Card sx={{ padding: 0, mt: 1, mb: 2 }}>
      <Stack flex="1" width="100%" spacing={2} marginY={2}>
        <Box p="0 16px">
          <Stack direction="row" flex={1} width="100%" alignItems="center" justifyContent="space-between">
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                username={data?.userWallet ?? data?.userAccountId ?? ''}
                avatarUrl={data?.userAvatarUrl}
              />
              <Stack direction="column" gap={0} alignItems="flex-start">
                {memberInfo()}
                <TimeLive lastTime={Number(data.createdAt)} fontWeight={500} fontSize={14} color="#11111199" />
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontWeight={500} fontSize={14}>Vote:</Typography>
              <VoteChip
                color={data.enumSC == 1
                  ? "for"
                  : data.enumSC == 2
                    ? "abstain"
                    : "against"}
                size='md'
              >
                {renderIcon()}
                {data.voteOptionName}
              </VoteChip>
            </Stack>
          </Stack>
        </Box>
        <Box p="0 16px">
          <Typography>
            {data.voteComment}
          </Typography>
        </Box>
      </Stack>
    </Card>
  )
}

export default CommentsItem
