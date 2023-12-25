import styled from "styled-components";

export const ConnectWalletStyled = styled.div`
  width: 150px;
  padding: 5px 10px;
  background-color: var(--primary-color);
  min-height: 40px;
  color: #fff;

  display: flex;
  align-items: center;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:hover {
    filter: brightness(0.85);
    transition: all 0.3s;
  }
`

export const OptionSetting = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  opacity: 0;
  visibility: hidden;

  ul {
    min-width: 180px;
    list-style: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: 1px solid #EAECF0;
    background-color: #fff;
    padding: 0;
    border-radius: 5px;

    li {
      padding: 10px 20px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-color: #ecf0f5;
        transition: all 0.3s;
      }
    }
  }
`

export const ContainerSettings = styled.div`
  position: relative;

  &:hover {
    ${OptionSetting} {
      opacity: 1;
      visibility: visible;
    }
  }
`
