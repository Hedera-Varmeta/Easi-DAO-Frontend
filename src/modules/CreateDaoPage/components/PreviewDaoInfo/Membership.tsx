import Address from '@/components/Address/Address'
import { Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { DAOForm } from '../..'
import { useFormContext } from 'react-hook-form';
import Avatar from '@/components/Avatar';
import { shortenString } from '@/utils/common';
import styled from 'styled-components';
type Props = {
  governorSettingName?: "ERC20VotesStandard" | "ERC721VotesStandard"
}

const Membership = ({ governorSettingName }: Props) => {
  const { getValues, watch } = useFormContext<DAOForm>();
  const distributeTokens = watch('distributeTokens')
  return (
    <Stack gap="10px">
      <Typography variant="h6">
        Memberships
      </Typography>

      <Stack
        direction="column"
        borderRadius="5px"
        gap="10px"
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellStyled>
                <Typography fontWeight={500}>Address</Typography>
              </TableCellStyled>
              <TableCellStyled>
                {governorSettingName === 'ERC20VotesStandard'
                  ? (<Typography fontWeight={500}>Amount</Typography>)
                  : (<Typography fontWeight={500}>Token Uri</Typography>)}
              </TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {distributeTokens.map((distributeItem, index) => (
              <TableRow key={index}>
                <TableCellStyled>
                  <Stack direction="row" alignItems="center" spacing={1}                    >
                    <Address address={distributeItem.address} length={10} />
                  </Stack>
                </TableCellStyled>
                <TableCellStyled>
                  {governorSettingName === 'ERC20VotesStandard'
                    ? <Typography fontSize={14} fontWeight={500}>
                      {distributeItem.amount}
                    </Typography>
                    : <Typography fontSize={14} fontWeight={500}>
                      {shortenString(distributeItem.tokenUri, 10)}
                    </Typography>}
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Stack >
  )
}

export default Membership

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#F6F6F699',
  border: '2px solid #ffffff',
  padding: 6,
  paddingLeft: 16,
  height: '40px'
}));