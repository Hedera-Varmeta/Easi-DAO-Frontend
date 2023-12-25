import { ManageDaoPage } from "@/modules/ManageDaoPage";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ManageDaoPage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string)),
    },
  };
};