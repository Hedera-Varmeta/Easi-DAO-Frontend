import { Box } from "@mui/material";
import styled, { css } from "styled-components";

export const AbiTypeStyled = styled(Box) <{ active: boolean }>`
  flex: 1;
  border: 1px solid #EAECF0;
  border-radius: 5px;
  padding: 10px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ecf0f5;
  }

  ${({ active }) => active && css`
    background-color: var(--primary-color) !important;
    color: #ffffff;
  `}
`

export const SelectAbiStyled = styled(Box)`
  display: flex;
  align-items: center;
  border: 1px solid #EAECF0;
  border-radius: 5px;
  padding: 10px;
  height: 80px;
`
