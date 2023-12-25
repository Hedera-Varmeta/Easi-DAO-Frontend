import { Layout } from "@/layout";
import { Container, Typography } from "@mui/material";
import { PageComponent } from "next";
import { Header } from "./components/Header";
import { ProposalsList } from "./components/ProposalsList";
// import { MemberList } from "./components/MemberList";
import { useGetDAODetail } from "@/api/dao";
import { BreadCrumbComponent } from "@/components/BreadCrumbs";
import { routeEnums } from "@/types/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import DaoDelegate from "./components/DaoDelegate";

export const DaoDetail: PageComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: DAO, isLoading: loadingDao } = useGetDAODetail(Number(id));
  const breadcrumbs = [
    <Link
      key="2"
      color="inherit"
      href={`${routeEnums.detailDAO}?id=${id}&governorId=${DAO?.governorId}`}
    >
      <Typography fontWeight={600} fontSize={16}>
        {DAO?.daoName}
      </Typography>
    </Link>,
  ];

  return (
    <>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg">
        <Header />
        <ProposalsList />
        <DaoDelegate />
        {/* <MemberList /> */}
      </Container>
    </>
  );
};

DaoDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
