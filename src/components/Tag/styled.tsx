import styled, { css } from "styled-components";

export const TagContainer = styled.div<{ size: "xs" | "sm" | "md", bgcolor?: string, textColor?: string }>`
  font-size: 13px;
  background-color: ${({ bgcolor }) => bgcolor ?? "var(--secondary-color)"};
  color: ${({ textColor }) => textColor ?? "black"};
  width: fit-content;
  
  ${({ size }) => size === 'xs' && css`
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 10px;
  `}

  ${({ size }) => size === 'sm' && css`
    padding: 5px 10px;
    border-radius: 3px;
  `}

  ${({ size }) => size === 'md' && css`
    padding: 8px 15px;
    border-radius: 5px;
  `}
`