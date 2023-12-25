import { ProfilePage } from "@/modules/ProfilePage";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default ProfilePage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string)),
    },
  };
};
