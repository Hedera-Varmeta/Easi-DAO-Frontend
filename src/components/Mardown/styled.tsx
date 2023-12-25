import { Button } from "@mui/material";
import styled from "styled-components";

export const ContainerMarkdown = styled.div`
  display: flex;
  /* gap: 1rem; */
  padding: 10px 0;
`

export const BtnMode = styled(Button) <{ active?: boolean; }>`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  /* min-width: 80px; */
  padding: 0px 10px;
  
  font-weight: ${(props) => props.active ? "700" : "400"};
  color: #8364e2;
  border-radius: 0;
  border-bottom: 2px solid ${(props) => props.active ? "#8364e2" : "transparent"};

  &:hover {
    background: transparent;
    box-shadow: none;
  }
`