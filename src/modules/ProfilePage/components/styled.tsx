import DefaultTextField from "@/form-fields/DefaultTextField";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(DefaultTextField)(({ theme }) => ({
  input: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const CustomUpload = styled("label")(({ theme }) => ({
  width: "240px",
  height: "240px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px dashed #d9d9d9",
  background: "#fafafa",
  cursor: 'pointer',
  transition: 'all 0.3s',
  backgroundColor: '#fff',

  '&:hover': {
    backgroundColor: '#ecf0f5',
    transition: 'all 0.3s'
  }
}));

const CustomImage = styled("img")(({ theme }) => ({
  width: "240px",
  height: "240px",
  border: "1px dashed #d9d9d9",
}));

export { CustomTextField, CustomUpload, CustomImage };
