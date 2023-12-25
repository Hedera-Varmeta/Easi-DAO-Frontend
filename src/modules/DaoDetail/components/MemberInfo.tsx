import { useGetHederaSmc } from '@/api/contract';
import { IDaoMember } from '@/api/dao';
import Address from '@/components/Address/Address';
import Avatar from '@/components/Avatar';
import { ERC20VotesStandard__factory, ERC721VotesStandard__factory } from '@/contracts/types';
import { DAO_VOTE_TYPE } from '@/utils/constants';
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { formatEther } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
  daoMember: IDaoMember
}

const MemberInfo = ({ daoMember }: Props) => {

  const [balance, setBalance] = useState<string | number>(0);

  const isErc20 = useMemo(() => {
    return daoMember?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [daoMember?.governorSettingName]);

  const dataEncode = useMemo(() => {
    let factory;
    switch (daoMember?.governorSettingName) {
      case DAO_VOTE_TYPE.ERC20_STANDARDS: //mint tokens
        // case SMC_FUNC.RELEASE_ERC20:
        factory = new ERC20VotesStandard__factory();
        break;
      case DAO_VOTE_TYPE.ERC721_STANDARDS:
        factory = new ERC721VotesStandard__factory();
        break;
      default:
        break;
    }
    if (!factory || !daoMember?.memberAddress) return;
    return factory.interface.encodeFunctionData("balanceOf", [
      daoMember?.memberAddress,
    ]);
  }, [daoMember?.governorSettingName, daoMember?.memberAddress]);

  //API Get Balance
  const { data: balanceData } = useGetHederaSmc(
    {
      block: "latest",
      data: dataEncode, //hàm get mà mình sẽ gọi
      estimate: false,
      from: daoMember?.memberAddress as string, //người gọi contract
      gas: 200000,
      gasPrice: 10000,
      to: daoMember?.voteToken as string, //contract address
      value: 0,
    },
    {
      enabled: !!dataEncode && !!daoMember?.memberAddress && !!daoMember?.voteToken,
      retry: false,
    }
  );

  useEffect(() => {
    if (balanceData) {
      const hexState = balanceData?.result;
      if (isErc20) setBalance(formatEther(BigNumber(hexState, 16).toFixed()));
      else setBalance(parseInt(hexState, 16));
    }
  }, [daoMember?.governorSettingName, balanceData, isErc20]);

  const memberInfo = useCallback(() => {
    if (daoMember.memberFirstName || daoMember.memberLastName)
      return <Typography
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 200
        }}>
        {`${daoMember.memberFirstName} ${daoMember.memberLastName}`}
      </Typography>
    else if (daoMember.memberAccountId)
      return <Typography
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 200
        }}>
        {daoMember.memberAccountId}
      </Typography>
    else
      return <Address
        address={daoMember.memberAddress}
        length={5}
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 200
        }} />
  }, [daoMember.memberAccountId, daoMember.memberAddress, daoMember.memberFirstName, daoMember.memberLastName])

  return (
    <TableRow
      key={daoMember.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <TableCell component="th" align="center">
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            username={daoMember?.memberAddress ?? daoMember?.memberAccountId ?? ''}
            avatarUrl={daoMember?.memberAvatarUrl}
          />
          <Stack direction="column" gap={0} alignItems="flex-start">
            {memberInfo()}
            <Typography sx={{
              fontWeight: 200,
              color: 'gray',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 200
            }}>
              Joined on {dayjs(Number(daoMember.createdAt ?? 0)).format('ddd, DD MMM YYYY')}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 14,
            color: "success.main",
          }}
        >
          {balance}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 14,
            color: "grey.500",
          }}
        >
         {daoMember.memberAddress}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default MemberInfo