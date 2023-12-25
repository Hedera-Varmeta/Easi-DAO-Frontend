import { styled as styledM } from "@mui/material/styles";
import Link from "next/link";
import styled from "styled-components";

const DotIcon = styledM("div")(({ theme }) => ({
  borderRadius: "50%",
  width: "5px",
  height: "5px",
  backgroundColor: theme.palette.text.primary,
  marginRight: "5px",
}));

export const LinkStyled = styledM(Link)(() => ({
  "&:hover": {
    textDecoration: "underline",
  },
  transition: "all 0.3s",
  display: "flex",
  alignItems: "center",
  gap: "2px",
}));

export { DotIcon };

export const IntroductionStepItem = styled.div`
  background-color: #8364e21d;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #eaecf0;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 5 / 4;
    background-color: #fff;
    border-radius: 5px;

    .icon-item {
      /* transform: rotateZ('20deg'); */
      transform: rotate3d(1, 1, 1, 20deg);
    }
  }

  .step {
    color: var(--text-des-color);
    font-size: 13px;
  }
`;
