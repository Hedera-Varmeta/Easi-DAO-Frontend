import { AppBar, Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const StyledAppBar = styled(AppBar)(({ theme, position }) => ({
  width: "100%",
  background: "transparent",
  boxShadow: "none",
  color: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  left: "0",
  top: "0",
  zIndex: "100%",
}));

const ContainerHeader = styled(Container)(() => ({
  height: "100%",
  paddingTop: 10,
  paddingBottom: 10,
}));

const Logo = styled(Image)(() => ({
  width: "auto",
  height: "32px",
  opacity: 0.9,
}));

export { StyledAppBar, Logo, ContainerHeader };
