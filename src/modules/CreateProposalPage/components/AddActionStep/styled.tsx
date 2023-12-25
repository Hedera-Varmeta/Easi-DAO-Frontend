import { Box, Button, } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  // width: "500px",
  // height: "65px",
  backgroundColor: "#FFFFFF",
  border: `1px solid rgba(0,0,0,.2)`,
  color: theme.palette.text.secondary,
  marginRight: "5px",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
}));

export const ArgumentName = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "48px",
  backgroundColor: "#EFEBFC",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  marginRight: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  // justifyContent: "spac",
}));
