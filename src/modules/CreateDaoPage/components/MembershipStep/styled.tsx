import styled from 'styled-components';

export const ParticipateStyled = styled.div<{ checked: true | false }>`
  display: flex;
  background-color: #faf9f9;
  border: 1px solid ${({ checked }) => checked ? 'var(--primary-color)' : '#ddd'};
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;

  .participate-name {
    font-weight: bold;
    color: ${({ checked }) => checked ? 'var(--primary-color)' : '#000'};
    font-size: 17px;
  }

  .participate-des {
    color: #6d6969;
  }

  div:nth-child(1) {
    flex: 1;
  }
`

export const HaveTokenStyled = styled.div<{ checked: true | false }>`
  display: flex;
  align-items: center;
  background-color: #faf9f9;
  border: 1px solid ${({ checked }) => checked ? 'var(--primary-color)' : '#EAECF0'};
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;

  p:nth-child(1) {
    flex: 1;
  }
`

export const FieldTokenContainer = styled.div`
  display: flex;
  gap: 20px;
`