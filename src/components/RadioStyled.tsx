import { Radio } from "@mui/material";
import { styled } from "@mui/material/styles";

export const RadioStyled = styled(Radio)(({ theme }) => ({
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${theme.palette.text.secondary} !important`,
    width: "100%",
  },
  "&.MuiRadio-root": {
    borderColor: "red",
    color: theme.palette.text.secondary,
  },
  "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)": {
    color: "rgba(0,0,0,.2)",
  },
  "& .MuiSvgIcon-root + .MuiSvgIcon-root": {
    color: theme.palette.text.secondary,
  },
}));
