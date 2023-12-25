import { IDAOResponse } from '@/api/dao'
import Avatar from '@/components/Avatar'
import { routeEnums } from '@/types/routes'
import { formatNumber, parseDate } from '@/utils/common'
import { DAO_VOTE_TYPE } from '@/utils/constants'
import styled from '@emotion/styled'
import { Chip, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

type Props = {
  row: IDAOResponse
}

const DaoItem = ({ row }: Props) => {
  const router = useRouter();
  const isErc20 = useMemo(() => {
    return row?.governorSettingName === DAO_VOTE_TYPE.ERC20_STANDARDS;
  }, [row?.governorSettingName]);

  return (
    <TableRow
      onClick={() =>
        router.push(
          `${routeEnums.detailDAO}?id=${row.id}&governorId=${row.governorId}`
        )
      }
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <TableCellStyled>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            username={row.daoName}
            avatarUrl={row.daoLogo}
          />
          <Stack direction="column" justifyContent="center" alignItems="start" spacing="5px">
            {/* <TypeState >
            {isErc20 ? "ERC20" : "ERC721"}
          </TypeState> */}
            <Typography
              variant='h6'
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 200
              }}>
              {row.daoName}
            </Typography>
            <Chip
              label={isErc20 ? "ERC20" : "ERC721"}
              color="primary"
              size="small"
              sx={{ fontSize: 12 }}
            />
          </Stack>
        </Stack>
      </TableCellStyled>
      <TableCellStyled align="right">
        <Typography fontWeight={500}>
          {formatNumber(row.totalProposals)}
        </Typography>
      </TableCellStyled>
      <TableCellStyled align="right">
        <Typography color="success.main" fontWeight={500}>
          {formatNumber(row.totalHolders)}
        </Typography>
      </TableCellStyled>
      <TableCellStyled align="right">
        <Typography fontWeight={500}>
          {formatNumber(row.totalVoters)}
        </Typography>
      </TableCellStyled>
    </TableRow>
  )
}

export default DaoItem

const TableCellStyled = styled(TableCell)(() => ({
  padding: '8px 16px',
}))

export const TypeState = styled.div`
  --success-color: #8364e2;
  font-weight: bold;
  display: inline-block;
  position: relative;
  color: var(--success-color);
  font-size: 8px;
  &::before {
    position: absolute;
    background-color: currentColor;
    content: '';
    width: 120%;
    height: 60%;
    top: 50%;
    left: 50%;
    opacity: 0.2;
    transform: translate(-50%, -50%);
    border-radius: 4px;
  }
`