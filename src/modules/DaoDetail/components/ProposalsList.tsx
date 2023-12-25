import { useGetListProposalByDaoId } from "@/api/proposal";
import { Empty } from "@/components/Empty";
import { routeEnums } from "@/types/routes";
import {
  Button,
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
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { TableCellStyled } from "../styled";
import ProposalInfo from "./ProposalInfo";

export const ProposalsList: FC = () => {
  const router = useRouter();
  const { id, governorId } = router.query;
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const { data: listProposal, isLoading } = useGetListProposalByDaoId({
    daoId: Number(id),
    ...params,
  });

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2, mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h5">Proposal List</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" colSpan={2}>
                <Link href={`${routeEnums.createProposal}?id=${id}`}>
                  <Button variant="contained" size="large">Create new Proposal</Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCellStyled>Proposal</TableCellStyled>
              <TableCellStyled align="center">Votes For</TableCellStyled>
              <TableCellStyled align="center">Votes Against</TableCellStyled>
              <TableCellStyled align="center">Votes Abstain</TableCellStyled>
              <TableCellStyled align="right">Total Votes</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProposal &&
              listProposal?.list.length > 0 &&
              listProposal?.list.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      `${routeEnums.detailProposal}?id=${item.id
                      }&governorId=${governorId}&daoId=${Number(id)}`
                    )
                  }
                >
                  <ProposalInfo proposal={item} />

                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: "success.main",
                      }}
                    >
                      {item.totalFor}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color="error"
                      sx={{ fontWeight: 500, fontSize: 14 }}
                    >
                      {item.totalAgainst}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color="grey.500"
                      sx={{ fontWeight: 500, fontSize: 14 }}
                    >
                      {item.totalAbstain}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="column" justifyContent="flex-end">
                      <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                        {item.totalVotes}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 200,
                          color: "gray",
                        }}
                      >
                        {item.totalVotes}{" "}
                        {item.totalVotes > 1 ? "addresses" : "address"}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
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
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
            {!listProposal ||
              (listProposal?.list.length === 0 && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" colSpan={5}>
                    <Empty />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!listProposal || listProposal?.list.length > 0) && (
        <Stack direction="row" justifyContent={"flex-end"} mb={2}>
          <Pagination
            count={listProposal?.pagination.totalPages}
            page={params.page}
            onChange={onChangePage}
          />
        </Stack>
      )}
    </>
  );
};
