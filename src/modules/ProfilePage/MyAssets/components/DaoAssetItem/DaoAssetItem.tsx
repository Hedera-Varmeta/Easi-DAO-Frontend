import Avatar from '@/components/Avatar';
import Tag from '@/components/Tag';
import { DAO_VOTE_TYPE } from '@/utils/constants';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import useDaoActiveProposal, { ProposalLists } from 'hooks/useDaoStatus';
import { useMemo } from 'react';

type Props = {
  title: string;
  logo: string;
  createdAt: number;
  voteType: string;
  totalProposals: number;
  totalMembers: number;
  totalVotes: number;
  governorAddress?: string
  proposalLists?: ProposalLists
}

const DaoAssetItem = ({
  title,
  logo,
  createdAt,
  voteType,
  totalMembers,
  totalProposals,
  totalVotes,
  governorAddress,
  proposalLists
}: Props) => {
  const isErc20 = useMemo(() => {
    return voteType === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [voteType]);
  const { state } = useDaoActiveProposal({ governorAddress, proposalLists })

  return (
    <Stack
      border="1px solid #EAECF0"
      borderRadius="10px"
      p="20px"
      bgcolor="#fff"
      sx={{
        background: 'radial-gradient(circle, rgba(211,174,241,0.09569765406162467) 0%, rgba(196,126,249,0.07889093137254899) 38%, rgb(238 129 201 / 0%) 65%, rgb(230 161 229 / 0%) 100%)',
        cursor: 'pointer',
        backdropFilter: 'blur(20px)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 'var(--box-shadow-container)',
          transition: '0.3s',
          background: 'radial-gradient(circle, rgba(211,174,241,0.09569765406162467) 0%, rgba(196,126,249,0.07889093137254899) 38%, rgba(238,129,201,0.08729429271708689) 65%, rgba(230,161,229,0.08729429271708689) 100%)'
        }
      }}
      gap="10px"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Stack direction="row" alignItems="center" spacing="10px">
            <Avatar
              username={title}
              avatarUrl={logo}
            />

            <Box flex={1} overflow="hidden">
              <Typography variant="h6" noWrap textOverflow="ellipsis">
                {title}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack direction="column" spacing="10px" py="5px">
            <Typography fontSize={12}>Your assets</Typography>
            <Stack direction="row" gap="5px" alignItems="center" flexWrap="wrap">
              <Tag title="Asset Name 1" />
              <Tag title="Asset Name 2" />
              <Typography fontSize={12}>and others</Typography>
            </Stack>
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Stack>
  );
};

export default DaoAssetItem;
