import { styled } from "@mui/material/styles";

export const DropZoneWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const PreviewImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  // top: 0,
  // left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  zIndex: 0,
}));