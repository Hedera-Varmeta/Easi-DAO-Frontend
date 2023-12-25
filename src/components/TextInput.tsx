import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TextInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    fontSize: 14,
  },
  // "& .MuiInputBase-input": {
  //   position: "relative",
  //   padding: "8px",
  // },
  "& .MuiInputBase-input:not(textarea)": {
    position: "relative",
    padding: "8px",
  },
  "& input": {
    "&:-webkit-autofill": {
      WebkitTextFillColor: theme.palette.text.primary,
    },
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid rgba(0,0,0,.2) !important`,
    boxShadow: `rgba(13, 202, 240, 0.5) 0px 0px 0px 4px`,
    transitionDuration: '500ms',
  },
  "& .Mui-focused": {
    color: theme.palette.text.primary,
  },
  "& .Mui-error": {
    color: `${theme.palette.error.main} !important`,
  },
  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.error.main} !important`,
  },
  "& .Mui-disabled": {
    textFillColor: "#25292E !important",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.04em",
  },
}));
