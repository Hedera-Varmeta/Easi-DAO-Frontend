import React from 'react';
import styled, { css } from "styled-components";

export const ProposalState = styled.div<{ color: 'success' | 'failed' | 'processing', size: 'sm' | 'md' | 'lg' }>`
  --success-color: #22bb33;
  --failed-color: #bb2124;
  --processing-color: #f0d84e;

  font-weight: bold;
  display: inline-block;
  position: relative;

  &::before {
    position: absolute;
    background-color: currentColor;
    content: '';
    width: 120%;
    top: 50%;
    left: 50%;
    opacity: 0.2;
    transform: translate(-50%, -50%);
    border-radius: 5px;
  }

  ${({ color }) => color === 'success' && css`
    color: var(--success-color);
  `}

  ${({ color }) => color === 'failed' && css`
    color: var(--failed-color);
  `}

  ${({ color }) => color === 'processing' && css`
    color: var(--processing-color);
  `}

  ${({ size }) => size === 'sm' && css`
     font-size: 8px;
     &::before {
        height: 75%;
      }
  `}

  ${({ size }) => size === 'md' && css`
     font-size: 14px;
     &::before {
        height: 140%;
      }
  `}

  ${({ size }) => size === 'lg' && css`
    font-size: 18px;
    &::before {
        height: 160%;
      }
  `}
`

const getStateState = (proposalState?: number): { color: 'success' | 'processing' | 'failed' | null, label: string | null } => {
  switch (proposalState) {
    case 0:
      return {
        color: 'processing',
        label: 'PENDING',
      }
    case 1:
      return {
        color: 'success',
        label: 'ACTIVE',
      }
    case 2:
      return {
        color: 'failed',
        label: 'CANCELLED',
      }
    case 3:
      return {
        color: 'failed',
        label: 'DEFEATED',
      }
    case 4:
      return {
        color: 'success',
        label: 'SUCCEEDED',
      }
    case 5:
      return {
        color: 'processing',
        label: 'QUEUED'
      }
    case 6:
      return {
        color: 'processing',
        label: 'EXPIRED',
      }
    case 7:
      return {
        color: 'success',
        label: 'EXECUTED',
      }
    default:
      return {
        color: null,
        label: null,
      }
  }
}

const ProposalStateLabel = ({ proposalState, size }: { proposalState?: number, size: 'sm' | 'md' | 'lg' }) => {
  const { color, label } = getStateState(proposalState)

  if (!color || !label) return null

  return (
    <ProposalState color={color} size={size}>
      {label}
    </ProposalState>
  );
};

export default ProposalStateLabel;