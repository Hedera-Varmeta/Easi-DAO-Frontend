import { useGetDAODetail } from "@/api/dao";
import {
  IGetListProposalParams,
  useGetDetailProposal,
  useGetInfinityVotes,
  useGetListVoteProposal,
} from "@/api/proposal";
import Address from "@/components/Address";
import Avatar from "@/components/Avatar";
import { BreadCrumbComponent } from "@/components/BreadCrumbs";
import { Layout } from "@/layout";
import { routeEnums } from "@/types/routes";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
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
  Typography,
} from "@mui/material";
import { PageComponent } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "./components/Header";
import { TableCellStyled } from "../DaoDetail/styled";
import { Empty } from "@/components/Empty";

export const VotesPage: PageComponent = () => {
  const router = useRouter();
  const { proposalId, enumSc } = router.query;
  const [type, setType] = useState<number>(Number(enumSc));
  const { data: proposal } = useGetDetailProposal({ id: Number(proposalId) });
  const { data: DAO } = useGetDAODetail(Number(proposal?.daoId), {
    enabled: !!proposal?.daoId,
  });
  const [params, setParams] = useState<IGetListProposalParams>({
    page: 1,
    limit: 20,
    proposalId: Number(proposalId),
    // enumSC: type,
  });

  const {
    data: { list = [], pagination } = {},
    isLoading,
    refetch,
  } = useGetListVoteProposal({
    proposalId: Number(proposalId),
    enumSC: params.enumSC,
    limit: params.limit,
  });

  const breadcrumbs = [
    // <Link key="2" color="inherit" href={routeEnums.manageDAO}>
    //   <Typography fontWeight={400} fontSize={16}>
    //     DAOs
    //   </Typography>
    // </Link>,
    <Link
      key="2"
      color="inherit"
      href={`${routeEnums.detailDAO}?id=${proposal?.daoId}&governorId=${DAO?.governorId}`}
    >
      <Typography fontWeight={400} fontSize={16}>
        {DAO?.daoName}
      </Typography>
    </Link>,
    <Link
      key="3"
      href={`${routeEnums.detailProposal}?id=${proposalId}&governorId=${
        DAO?.governorId
      }&daoId=${Number(DAO?.id)}`}
    >
      <Typography key="3" fontWeight={400} fontSize={16}>
        {proposal?.proposalTitle}
      </Typography>
    </Link>,
    <Typography key={4} color="black" fontWeight={600} fontSize={16}>
      Votes
    </Typography>,
  ];

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };

  return (
    <>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />
      <Container maxWidth="md">
        <Header />
        <TableContainer component={Paper} sx={{ mb: 2, mt: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">Votes List</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCellStyled>Voter</TableCellStyled>

                <TableCellStyled align="center">Voting Power</TableCellStyled>
                <TableCellStyled align="center">Status</TableCellStyled>
                {/* <TableCellStyled align="center">Votes Abstain</TableCellStyled>
                <TableCellStyled align="right">Total Votes</TableCellStyled> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list?.length > 0 &&
                list?.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    // onClick={() =>
                    //   router.push(
                    //     `${routeEnums.detailProposal}?id=${
                    //       item.id
                    //     }&governorId=${governorId}&daoId=${Number(id)}`
                    //   )
                    // }
                  >
                    <TableCell>
                      {" "}
                      <Stack direction="row" alignItems="center" spacing="5px">
                        <Avatar
                          username={item.userUsername}
                          avatarUrl={item.userAvatarUrl}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Address
                          address={item.voteAddress}
                          showCopy={false}
                          length={5}
                        />
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
                        {item.votePower}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography
                        color="error"
                        sx={{ fontWeight: 500, fontSize: 14 }}
                      >
                        {item.enumSC === "0" && (
                          <Chip label="Against" color="error"/>
                        )}
                        {item.enumSC === "1" && (
                          <Chip label="For" color="success" />
                        )}
                        {item.enumSC === "2" && <Chip label="Abstain" />}
                      </Typography>
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
              {!list ||
                (list?.length === 0 && (
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
        {(!list || list?.length > 0) && (
          <Stack direction="row" justifyContent={"flex-end"} mb={2}>
            <Pagination
              count={pagination?.totalPages}
              page={params.page}
              onChange={onChangePage}
            />
          </Stack>
        )}
      </Container>
    </>
  );
};

VotesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
