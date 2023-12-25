import { useGetHederaSmc } from '@/api/contract'
import { useGetDAODetail } from '@/api/dao'
import { IProposal } from '@/api/proposal'
import { useGetUserInfo } from '@/api/user'
import Avatar from '@/components/Avatar'
import ProposalStateLabel from '@/components/ProposalStateLabel'
import { StandardGovernor__factory } from '@/contracts/types'
import { getIsAuthenticator } from '@/store/ducks/auth/slice'
import { Stack, TableCell, Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { useGetHashProposal } from 'hooks/useGetHashProposal'
import { useAppSelector } from 'hooks/useRedux'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  proposal: IProposal
}

const ProposalInfo = ({ proposal }: Props) => {
  const router = useRouter();
  const { query } = router;
  const [proposalId, setProposalId] = useState('')

  const { data: DAO } = useGetDAODetail(Number(query.id));

  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: user } = useGetUserInfo({ enabled: !!isAuthenticator });

  const { getHashPropposal } = useGetHashProposal(200000);
  const [proposalState, setProposalState] = useState<number>();

  useEffect(() => {
    (async () => {
      if (!proposal || !DAO) return null;

      const encodeDataUnit8Array = JSON.parse(proposal.encodeArr)?.map(
        (item: string) => ethers.utils.arrayify(item)
      );

      const valueArray = JSON.parse(proposal.valueArr)?.map(
        (item: string | number) => {
          return Number(item);
        }
      );

      const hashProposal: any = await getHashPropposal(
        JSON.parse(proposal.addressArr),
        encodeDataUnit8Array,
        valueArray,
        ethers.utils.arrayify(
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposal.proposalTitle)
          )
        ),
        DAO?.governorAddress //governor address
      );

      setProposalId(hashProposal)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DAO, proposal])

  const dataEncode = useMemo(() => {
    if (!proposalId) return null;
    const standardGovernor = new StandardGovernor__factory();
    return standardGovernor.interface.encodeFunctionData("state", [proposalId])
  }, [proposalId])

  const { data, isLoading } = useGetHederaSmc({
    block: "latest",
    data: dataEncode, //hàm get mà mình sẽ gọi
    estimate: false,
    from: user?.wallet as string, //người gọi contract
    gas: 120000,
    gasPrice: 10000,
    to: DAO?.governorAddress as string, //contract address
    value: 0
  }, {
    enabled: !!dataEncode && !!user?.wallet && !!DAO?.governorAddress,
    refetchInterval: (proposalState !== 3 && proposalState !== 7) ? 3000 : 0
  })

  useEffect(() => {
    if (data) {
      const hexState = data?.result
      setProposalState(parseInt(hexState, 16));
    }
  }, [data])

  return (
    <TableCell component="th" align="center">
      <Stack direction="row" gap={1} alignItems="center">
        <Avatar
          username={proposal.userWallet ?? proposal.userAccountId ?? ''}
          avatarUrl={proposal.userAvatarUrl}
        />
        <Stack direction="column" gap={0} alignItems="start">
          <Tooltip title={proposal.proposalTitle}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 200
              }}
            >
              {proposal.proposalTitle}
            </Typography>
          </Tooltip>
          <ProposalStateLabel proposalState={proposalState} size='sm' />
          <Stack gap={1} direction="row" alignItems="center">
            <Typography sx={{
              fontWeight: 200,
              color: 'gray'
            }}>
              Proposed on {dayjs(Number(proposal.proposalCreatedAt ?? 0)).format('ddd, DD MMM YYYY')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </TableCell>
  )
}

export default ProposalInfo
