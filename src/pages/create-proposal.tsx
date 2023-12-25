import { CreateProposalPage } from "@/modules/CreateProposalPage";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default CreateProposalPage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string)),
    },
  };
};