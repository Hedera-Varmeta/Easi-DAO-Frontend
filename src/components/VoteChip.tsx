import styled, { css } from "styled-components";

export const VoteChip = styled.div<{ color: 'for' | 'against' | 'abstain', size: 'sm' | 'md' | 'lg' }>`
  --for-vote-color: #60c5a3;
  --against-vote-color: #ff4c4c;
  --abstain-vote-color: #667085;
  font-weight: bold;
  display: flex;
  align-items: center;
  position: relative;
  gap: 2px;

  &::before {
    position: absolute;
    background-color: currentColor;
    content: '';
    top: 50%;
    left: 50%;
    opacity: 0.2;
    transform: translate(-50%, -50%);
    border-radius: 25px;
  }

  ${({ color }) => color === 'for' && css`
    color: var(--for-vote-color);
  `}

  ${({ color }) => color === 'against' && css`
    color: var(--against-vote-color);
  `}

  ${({ color }) => color === 'abstain' && css`
    color: var(--abstain-vote-color);
  `}

  ${({ size }) => size === 'sm' && css`
     font-size: 8px;
     &::before {
        width: 120%;
        height: 75%;
      }
  `}

  ${({ size }) => size === 'md' && css`
     font-size: 14px;
     &::before {
        width: 120%;
        height: 140%;
      }
  `}

  ${({ size }) => size === 'lg' && css`
    font-size: 18px;
    &::before {
        width: 120%;
        height: 160%;
      }
  `}
`