import { IValueResponse } from '@/api/dao';
import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import styled from 'styled-components';

type Props = {
  governorSettings: IValueResponse[];
  voteSettings: IValueResponse[]
}

const ContractParams = ({ governorSettings, voteSettings }: Props) => {

  return (
    <Grid container columnSpacing="0px">
      <Grid item xs={12} sm={6} p={0} sx={{ mr: { sm: '-1px', xs: 'unset' } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellStyled colSpan={2}>
                <Typography
                  color="secondary"
                  variant="h6"
                  fontWeight={600}
                >
                  Governor Settings
                </Typography>
              </TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {governorSettings.map((item) => (
              <TableRow key={item.id}>
                <TableCellStyled>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight={600}>
                      {item.fieldDescription}
                    </Typography>
                    <Stack
                      direction="row"
                      gap={1}
                      justifyContent="flex-end"
                    >
                      <Typography fontWeight={500} color="grey.500">
                        {item.fieldValue}
                      </Typography>
                      <Typography fontWeight={500} color="grey.500">
                        {item?.settingValue?.indexOf("Block") > -1
                          ? item.settingValue.substring(0, 5)
                          : item.settingValue}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12} sm={6} p={0} sx={{ ml: { sm: '-1px', xs: 'unset' } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellStyled>
                <Typography
                  color="secondary"
                  variant="h6"
                  fontWeight={600}
                >
                  Votes Settings
                </Typography>
              </TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {voteSettings.map((item) => (
              <TableRow key={item.id}>
                <TableCellStyled>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight={600}>
                      {item.fieldDescription}
                    </Typography>
                    <Stack
                      direction="row"
                      gap={1}
                      justifyContent="flex-start"
                    >
                      <Typography fontWeight={500} color="grey.500">{item.fieldValue} </Typography >
                    </Stack>
                  </Stack>
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid >
  )
}

export default ContractParams

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#F6F6F699',
  border: '2px solid #ffffff',
  padding: 8,
  paddingLeft: 16,
}));