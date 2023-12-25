import { ButtonBase } from "@mui/material";
import styled, { css } from "styled-components";

export const TransactionTypeBox = styled(ButtonBase) <{ active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 7px 5px;
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ active }) => active && css`
    background-color: #fff;
    color: var(--primary-color);
    transition: all 0.3s;
    font-weight: bold;
  `}
`