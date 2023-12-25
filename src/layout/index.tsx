import { Header } from "./Header";
import { ReactFCWithChildren } from "@/types/react";
import { Footer } from "./Footer";
import { LoginModal } from "components/Modal";
import { Toaster } from "react-hot-toast";
import { MainStyled } from "./styled";

export const Layout: ReactFCWithChildren = ({ children }) => {
  return (
    <>
      <Header />
      <MainStyled>{children}</MainStyled>
      <Footer />
      <LoginModal />
      <Toaster />
    </>
  );
};
