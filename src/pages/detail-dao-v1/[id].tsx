import { DaoDetail } from "@/modules/DaoDetail";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default DaoDetail;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return { props: {} };
}
