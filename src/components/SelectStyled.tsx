import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SelectStyled = styled(Select)(({ theme }) => ({
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.text.secondary} !important`,
    width: '100%',
  },
  "& .MuiSelect-select": {
    minWidth: '200px',
    width: '100%',
    padding: "8px",
  },
}));
