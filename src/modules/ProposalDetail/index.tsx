import { useGetDAODetail } from "@/api/dao";
import { useGetDetailProposal } from "@/api/proposal";
import { BreadCrumbComponent } from "@/components/BreadCrumbs";
import { Layout } from "@/layout";
import { routeEnums } from "@/types/routes";
import { Container, Link, Typography } from "@mui/material";
import { PageComponent } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Detail } from "./component/Detail";
import Header from "./component/Header";

const VoteChart = dynamic(() => import("./component/VoteChart"), {
  ssr: false,
});

export const ProposalDetailPage: PageComponent = () => {
  const router = useRouter();
  const { query } = router;
  const { daoId } = router.query;
  const { data: proposal } = useGetDetailProposal({ id: Number(query.id) });
  const { data: DAO } = useGetDAODetail(Number(query.daoId));

  const breadcrumbs = [
    // <Link key="2" color="inherit" href={routeEnums.manageDAO}>
    //   <Typography fontWeight={400} fontSize={16}>
    //     DAOs
    //   </Typography>
    // </Link>,
    <Link
      key="2"
      color="inherit"
      href={`${routeEnums.detailDAO}?id=${daoId}&governorId=${DAO?.governorId}`}
    >
      <Typography fontWeight={400} fontSize={16}>
        {DAO?.daoName}
      </Typography>
    </Link>,
    <Typography color="black" key="3" fontWeight={600} fontSize={16}>
      {proposal?.proposalTitle}
    </Typography>,
  ];

  return (
    <>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg">
        <Header />
        <VoteChart
          proposalId={proposal?.proposalId}
          governorAddress={proposal?.governorAddress}
          proposal={proposal}
        />
        <Detail proposal={proposal} />
      </Container>
    </>
  );
};

ProposalDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
