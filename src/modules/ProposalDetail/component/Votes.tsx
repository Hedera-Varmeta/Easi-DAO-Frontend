import {
  IProposalItemResponse,
  useGetDetailProposal,
  useGetListVoteProposal,
} from "@/api/proposal";
import Address from "@/components/Address";
import Avatar from "@/components/Avatar";
import { Empty } from "@/components/Empty";
import RefetchButton from "@/components/RefetchButton/RefetchButton";
import { routeEnums } from "@/types/routes";
import { formatNumber } from "@/utils/common";
import {
  Box,
  Button,
  Card,
  Pagination,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useGetHashProposal } from "hooks/useGetHashProposal";
import { useProposalVotes } from "hooks/useProposalVotes";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";

const steps = [
  "Published on-chain",
  "Voting period started",
  "End voting period",
  "Execute proposal",
];

type Props = {
  proposalId: any;
  governorAddress: any;
};

const Votes = (_props: Props) => {
  const router = useRouter();
  const { query } = router;
  const [proposalId, setProposalId] = useState("");
  const [tab, setTab] = useState<0 | 1 | 2>(1);
  const handleChange = (event: SyntheticEvent, newValue: 2 | 0 | 1) => {
    setTab(newValue);
  };
  const [votes, setVotes] = useState({
    againstVotes: 0,
    forVotes: 0,
    abstainVotes: 0,
  });

  const { getProposalVotes } = useProposalVotes(200000);
  const { getHashPropposal } = useGetHashProposal(200000);

  const {
    data: { list = [], pagination } = {},
    isLoading,
    refetch,
  } = useGetListVoteProposal({
    proposalId: Number(query.id),
    enumSC: tab,
    limit: 5,
  });
  const { data: proposal } = useGetDetailProposal({ id: Number(query.id) });

  const uint8array = useMemo(() => {
    if (!_props.proposalId) {
      return undefined;
    }
    // return ethers.utils.arrayify(
    //   ethers.utils.keccak256(ethers.utils.toUtf8Bytes(_props.proposalId))
    // );
    return ethers.utils.arrayify(_props.proposalId);
  }, [_props]);

  const getVotes = async () => {
    if (!proposalId || !_props.governorAddress) return;
    const result = await getProposalVotes(
      proposalId as unknown as Uint8Array,
      _props.governorAddress
    );

    setVotes({
      againstVotes: Number(formatEther(result?.againstVotes)),
      abstainVotes: Number(formatEther(result?.abstainVotes)),
      forVotes: Number(formatEther(result?.forVotes)),
    });
  };

  useEffect(() => {
    getVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uint8array]);

  useEffect(() => {
    (async () => {
      if (!proposal || !_props.governorAddress) return null;

      const encodeDataUnit8Array = JSON.parse(proposal.encodeArr).map(
        (item: string) => ethers.utils.arrayify(item)
      );

      const valueArray = JSON.parse(proposal.valueArr).map(
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
        _props.governorAddress //governor address
      );

      setProposalId(hashProposal);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal, _props.governorAddress]);

  const voteAmount = useMemo(() => {
    switch (tab) {
      case 0: {
        return votes.againstVotes;
      }
      case 2: {
        return votes.abstainVotes;
      }
      default: {
        return votes.forVotes;
      }
    }
  }, [tab, votes.abstainVotes, votes.againstVotes, votes.forVotes]);

  return (
    <Box height="100%">
      <Card sx={{ height: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>
                  <Stack
                    direction="row"
                    spacing="20px"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4">Votes</Typography>
                    <RefetchButton
                      onRefetch={() => {
                        getVotes();
                        refetch();
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0 }} colSpan={4}>
                  <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor:
                          tab == 1
                            ? "var(--for-vote-color)"
                            : tab == 2
                            ? "var(--abstain-vote-color)"
                            : "var(--against-vote-color)",
                      },
                    }}
                    sx={{ height: 10 }}
                  >
                    <Tab
                      sx={{
                        textTransform: "inherit",
                        fontWeight: 600,
                        color:
                          tab == 1
                            ? "var(--for-vote-color) !important"
                            : "#111111",
                      }}
                      label={`For`}
                      value={1}
                    />
                    <Tab
                      sx={{
                        textTransform: "inherit",
                        fontWeight: 600,
                        color:
                          tab == 0
                            ? "var(--against-vote-color) !important"
                            : "#111111",
                      }}
                      label={`Against`}
                      value={0}
                    />
                    <Tab
                      sx={{
                        textTransform: "inherit",
                        fontWeight: 600,
                        color:
                          tab == 2
                            ? "var(--abstain-vote-color) !important"
                            : "#111111",
                      }}
                      label={`Abstain`}
                      value={2}
                    />
                  </Tabs>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                {/* <TableCell>
                  <Typography>
                    {formatNumber(Number(pagination?.totalItems ?? 0))} Addresses
                  </Typography>
                </TableCell> */}
                <TableCell align="center" colSpan={4}>
                  {formatNumber(voteAmount, 0)} votes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length > 0 && !isLoading ? (
                list.map((row: IProposalItemResponse) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack direction="row" alignItems="center" spacing="5px">
                        <Avatar
                          username={row.userUsername}
                          avatarUrl={row.userAvatarUrl}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Address
                          address={row.voteAddress}
                          showCopy={false}
                          length={5}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">
                        {formatNumber(+row.votePower)}
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
              {list.length > 0 && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" colSpan={4}>
                    <Link
                      href={`${routeEnums.allVotes}?proposalId=${query.id}`}
                    >
                      <Button variant="outlined" size="large" fullWidth>
                        <Typography>View More</Typography>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Votes;
