import { IconButton } from "@mui/material";
import styled, { css } from "styled-components";

export const TypeItemStyled = styled.div<{ active: boolean }>`
  background-color: #f4f4f4;
  padding: 10px 20px;
  border: 1px solid #EAECF0;
  border-radius: 5px;
  width: calc((100% - 20px) / 3);
  
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    filter: brightness(0.8);
    transition: all 0.3s;
  }

  ${({ active }) => active && css`
    background-color: var(--primary-color);
    color: #fff;
  `}
`

export const EditBoxStyled = styled(IconButton)`
  width: 40px;
  height: 40px;
  background-color: var(--secondary-color);
  color: var(--blue-color-70);
  transition: all 0.3s;

  &:hover {
    background-color: var(--secondary-color);
    filter: brightness(0.9);
    transition: all 0.3s;
  }
`

export const RemoveBoxStyled = styled(IconButton)`
  width: 40px;
  height: 40px;
  background-color: var(--error);
  color: #fff;
  transition: all 0.3s;

  &:hover {
    background-color: var(--error);
    filter: brightness(0.9);
    transition: all 0.3s;
  }
`
