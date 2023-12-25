import { Box, Stack } from "@mui/material";
import styled, { css } from "styled-components";

export const VoteItemContainer = styled(Stack)<{
  enumSC: string;
  active: boolean;
}>`
  cursor: pointer;
  transition: all 0.3s;

  ${({ enumSC, active }) =>
    enumSC === "0" &&
    active &&
    css`
      background-color: var(--against-vote-color);
      color: #fff;
    `}
  ${({ enumSC, active }) =>
    enumSC === "1" &&
    active &&
    css`
      background-color: var(--for-vote-color);
      color: #fff;
    `}
  ${({ enumSC, active }) =>
    enumSC === "2" &&
    active &&
    css`
      background-color: var(--abstain-vote-color);
      color: #fff;
    `}
`;

export const ContainerProposalContent = styled(Box)`
  display: flex;
  border-radius: 4px;
  border: 1px solid #cbd5e0;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;
