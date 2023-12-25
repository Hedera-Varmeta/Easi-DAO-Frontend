import { styled } from "@mui/material/styles";

const DotIcon = styled("div")(({ theme }) => ({
  borderRadius: "50%",
  width: "5px",
  height: "5px",
  backgroundColor: theme.palette.text.primary,
  marginRight: '5px',
}));

export { DotIcon };
