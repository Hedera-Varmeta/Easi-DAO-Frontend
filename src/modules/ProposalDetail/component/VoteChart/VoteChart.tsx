import { IProposal, IProposalItemResponse, useGetListAllVoteProposal } from '@/api/proposal';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Votes from '../Votes';
import BubbleChart from './BubbleChart';
import LineChartVote from './LineChartVote';
import TotalTypeVote from './TotalTypeVote';
import { Show } from '@/components/Show';
import { Empty } from '@/components/Empty';
import { Status } from '../Status';

type Props = {
  proposalId: any;
  governorAddress: any;
  proposal?: IProposal;
}

export type TimelineVote = {
  createdAt: string | number;
  userVotePower: number;
  sumForVotePower: number;
  sumAgainstVotePower: number;
  sumAbstainVotePower: number;
  voteOptionName?: string;
  userWallet?: string;
  userUsername?: string;
  userAvatarUrl?: string
}

const VoteChart = ({ proposal, ...props }: Props) => {
  const { query } = useRouter();
  const { id } = query
  const [dataVote, setDataVote] = useState<TimelineVote[]>([])
  const { data } = useGetListAllVoteProposal({
    proposalId: Number(id)
  }, { enabled: !!id })

  useEffect(() => {
    if (data?.list) {
      const handleData = data?.list?.sort((aData, bData) => Number(aData.createdAt) - Number(bData.createdAt))
        .reduce((acc: TimelineVote[], item: IProposalItemResponse, index) => {
          const handleItem = {
            createdAt: +item.createdAt,
            sumForVotePower: 0,
            sumAgainstVotePower: 0,
            sumAbstainVotePower: 0,
            userVotePower: Number(item.votePower),
            userWallet: item.voteAddress,
            voteOptionName: item.voteOptionName ?? '',
            userUsername: item.userUsername,
            userAvatarUrl: item.userAvatarUrl
          }

          if (item.voteOptionName === 'For') {
            handleItem.sumForVotePower = index === 0 ? Number(item.votePower) : Number(acc[index - 1]?.sumForVotePower) + Number(item.votePower)
            handleItem.sumAgainstVotePower = index === 0 ? 0 : Number(acc[index - 1]?.sumAgainstVotePower)
            handleItem.sumAbstainVotePower = index === 0 ? 0 : Number(acc[index - 1]?.sumAbstainVotePower)
          } else if (item.voteOptionName === 'Against') {
            handleItem.sumAgainstVotePower = index === 0 ? Number(item.votePower) : Number(acc[index - 1]?.sumAgainstVotePower) + Number(item.votePower)
            handleItem.sumForVotePower = index === 0 ? 0 : Number(acc[index - 1]?.sumForVotePower)
            handleItem.sumAbstainVotePower = index === 0 ? 0 : Number(acc[index - 1]?.sumAbstainVotePower)
          } else {
            handleItem.sumAbstainVotePower = index === 0 ? Number(item.votePower) : Number(acc[index - 1]?.sumAbstainVotePower) + Number(item.votePower)
            handleItem.sumAgainstVotePower = index === 0 ? 0 : Number(acc[index - 1]?.sumAgainstVotePower)
            handleItem.sumForVotePower = index === 0 ? 0 : Number(acc[index - 1]?.sumForVotePower)
          }

          acc = acc.concat([handleItem])

          return acc
        }, [])

      setDataVote(
        handleData
      )
    }
  }, [data?.list])

  const getPercentVotePower = useMemo(() => {
    return dataVote.reduce((acc, item) => {
      if (item.voteOptionName === 'For') {
        acc.for = acc.for + item.userVotePower
      } else if (item.voteOptionName === 'Against') {
        acc.against = acc.against + item.userVotePower
      } else {
        acc.abstain = acc.abstain + item.userVotePower
      }

      acc.sumVotePower = acc.sumVotePower + item.userVotePower

      return acc
    }, { for: 0, against: 0, abstain: 0, sumVotePower: 0 })
  }, [dataVote])

  return (
    <Box marginY="20px">
      <Grid container spacing="20px">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: '20px' }}>
            <Stack
              flexWrap="wrap"
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              mb="20px"
            >
              <Typography variant="h4">
                Voting power
              </Typography>
              <TotalTypeVote
                totalAbstain={getPercentVotePower?.abstain ?? 0}
                totalAgainst={getPercentVotePower?.against ?? 0}
                totalFor={getPercentVotePower?.for ?? 0}
                total={getPercentVotePower?.sumVotePower ?? 0}
              />
            </Stack>
            <Box width="100%" height={400}>
              <BubbleChart
                data={dataVote.map(
                  (item) => ({
                    name: item?.userUsername ?? '',
                    value: +item.userVotePower,
                    optionName: item?.voteOptionName ?? ''
                  }))}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Votes
            proposalId={props.proposalId}
            governorAddress={props.governorAddress}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: '20px' }}>
            <Typography variant="h4">
              Voting timeline
            </Typography>
            <Box
              width="100%"
              height="400px"
              marginTop="20px"
            >
              <LineChartVote
                data={[{
                  createdAt: 0,
                  userVotePower: 0,
                  sumForVotePower: 0,
                  sumAgainstVotePower: 0,
                  sumAbstainVotePower: 0,
                }, ...dataVote]}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Status proposal={proposal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VoteChart;
