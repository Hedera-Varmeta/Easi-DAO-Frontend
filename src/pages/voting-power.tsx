import { MyVotingPowerPage } from "@/modules/MyVotingPowerPage";
import { ProfilePage } from "@/modules/ProfilePage";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default MyVotingPowerPage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string)),
    },
  };
};
