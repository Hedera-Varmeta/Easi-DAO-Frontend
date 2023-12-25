
import { Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CheckBoxStyled = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-root": {
    color: 'rgba(0,0,0,.2)',
    borderRadius: '4px'
  },
  "&.Mui-checked": {
    color: `${theme.palette.text.secondary}`,
  },
}));
