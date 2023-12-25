import { ButtonBase, Box } from "@mui/material";
import styled, { css } from "styled-components";

export const BalanceWalletItem = styled(ButtonBase)<{ active: boolean }>`
  height: 100%;
  min-height: 40px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  transition: all 0.3s;
  background-color: var(--primary-color);

  ${({ active }) =>
    active &&
    css`
      color: var(--primary-color);
      background-color: #fff;
      font-weight: bold;
    `}
`;

export const BalanceContainer = styled(Box)`
  position: relative;

  /* &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: url('/images/saving.svg');
    background-repeat: no-repeat;
    background-size: 40% 40%;
    background-position: center left;
  } */

  div {
    backdrop-filter: blur(4px);
  }
`;

export const TransactionTypeItemIcon = styled.div<{
  type: "deposit" | "withdraw";
}>`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  ${({ type }) =>
    type === "deposit" &&
    css`
      background-color: var(--deposit-color);
    `}

  ${({ type }) =>
    type === "withdraw" &&
    css`
      background-color: var(--withdraw-color);
    `}
`;
