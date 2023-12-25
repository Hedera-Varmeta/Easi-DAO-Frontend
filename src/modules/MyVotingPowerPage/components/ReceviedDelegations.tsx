import {
  IRecievedDelegate,
  useGetDAODetail,
  useGetRecievedDelegate,
} from "@/api/dao";
import Address from "@/components/Address";
import Avatar from "@/components/Avatar";
import { Empty } from "@/components/Empty";
import { FCC } from "@/types/util.types";
import { formatNumber, parseDate } from "@/utils/common";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  votingPower: string | number;
  symbolToken: string;
}

export const ReceviedDelegations: FCC<Props> = ({
  votingPower,
  symbolToken,
}) => {
  const router = useRouter();
  const { daoId } = router.query;
  const { data: DAO } = useGetDAODetail(Number(daoId));
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const { data: recievedData, isLoading } = useGetRecievedDelegate(
    { page: params.page, limit: params.limit, daoName: String(DAO?.daoName) },
    { enabled: !!DAO?.daoName }
  );
  console.log(recievedData);

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };
  return (
    <Grid container mt={0.5} spacing={1}>
      {/* <Grid item xs={12}>
        <Card>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            padding={1}
            alignItems={"center"}
          >
            <Typography fontSize={16} fontWeight={600}>
              Your Statement
            </Typography>
            <Button variant="outlined">Edit</Button>
          </Stack>
          <Divider />
          <Box padding={4} textAlign={"center"}>
            No statement provided
          </Box>
          <Divider />
          <Box sx={{ textAlign: "center", padding: 2 }}>
            <Link href={""}>
              <Typography fontWeight={500}>View Profile</Typography>
            </Link>
          </Box>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            padding={2}
            alignItems={"center"}
          >
            <Typography fontSize={16} fontWeight={600}>
              {votingPower} {symbolToken} Total Voting Power
            </Typography>
          </Stack>
          <Divider />
          <TableContainer sx={{ height: "100%" }}>
            <Table
              // sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableCell>Delegator</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">At</TableCell>
              </TableHead>
              <TableBody>
                {recievedData && recievedData?.list.length > 0 && !isLoading ? (
                  recievedData.list.map((row: IRecievedDelegate) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing="5px"
                        >
                          <Avatar
                            username={row.fromUsername}
                            avatarUrl={row.fromAvatarUrl}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Address
                            address={row.fromWallet}
                            showCopy={false}
                            length={5}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight="bold">
                          {formatNumber(+row.balance)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight="bold">
                          {parseDate(Number(row.createdAt))}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" colSpan={4}>
                      <Empty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        {(!recievedData || recievedData?.list.length > 0) && (
          <Stack direction="row" justifyContent={"flex-end"} mb={2} mt={1}>
            <Pagination
              count={recievedData?.pagination.totalPages}
              page={params.page}
              onChange={onChangePage}
            />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};
