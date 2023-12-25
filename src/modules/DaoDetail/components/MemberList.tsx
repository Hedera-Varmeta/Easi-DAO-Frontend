import { useGetListDAOMember } from "@/api/dao";
import { Empty } from "@/components/Empty";
import RefetchButton from "@/components/RefetchButton/RefetchButton";
import {
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { TableCellStyled } from "../styled";
import MemberInfo from "./MemberInfo";

export const MemberList: FC = () => {
  const router = useRouter();
  const { id, governorId } = router.query;
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const { data: listMember, isLoading, refetch } = useGetListDAOMember({
    id: Number(id),
    ...params,
  });

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };

  const onRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2, mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h5">DAOs Membership</Typography>
              </TableCell>
              <TableCell align="right">
                <RefetchButton
                  onRefetch={onRefetch}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCellStyled>Member</TableCellStyled>
              <TableCellStyled align="center">Balance</TableCellStyled>
              <TableCellStyled align="center">Wallet Address</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && listMember &&
              listMember?.list.length > 0 &&
              listMember?.list.map((item, index) => (
                <MemberInfo key={item.id} daoMember={item} />
              ))}
            {isLoading &&
              Array.from(Array(10).keys()).map((item) => (
                <TableRow
                  key={item}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {(!listMember || listMember?.list.length === 0) && <Empty />}
      </TableContainer >
      {listMember && listMember?.list.length > 0 && (
        <Stack direction="row" justifyContent={"flex-end"} mb={2}>
          <Pagination
            count={listMember?.pagination.totalPages}
            page={params.page}
            onChange={onChangePage}
          />
        </Stack>
      )
      }
    </>
  );
};
