import { ICommentProposalResponse, useGetListCommentProposal } from "@/api/proposal";
import { Empty } from "@/components/Empty";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import CommentsItem from "./CommentsItem";


type Props = {}

const Comments = (_props: Props) => {
  const router = useRouter();
  const { query } = router;
  const { data: { list = [], pagination } = {}, isLoading, refetch } =
    useGetListCommentProposal({
      proposalId: Number(query.id)
    });

  const onRefetchList = () => {
    refetch()
  }

  return (
    <Box>
      {list.length > 0 && !isLoading ? (
        list.map((row: ICommentProposalResponse) => (
          <CommentsItem data={row} key={row.id} />
        ))
      ) : (
        <Empty />
      )}
    </Box>
  );
};

export default Comments