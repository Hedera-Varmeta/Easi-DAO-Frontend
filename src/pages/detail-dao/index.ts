import Page from './detail-dao'
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default Page

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string)),
    },
  };
};
