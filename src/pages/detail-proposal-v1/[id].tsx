import { ProposalDetailPage } from "@/modules/ProposalDetail";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ProposalDetailPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return { props: {} };
}
