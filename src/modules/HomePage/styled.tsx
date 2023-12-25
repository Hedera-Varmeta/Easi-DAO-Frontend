import { Box, Card, } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxBackground = styled("div")(() => ({
  backgroundImage: "url(/images/home/home-banner.png)",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: "contain",
  opacity: 0.3,
  position: 'absolute',
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  "@media (max-width:1024px)": {
    padding: "0 10px",
  },
}));

const ManPic = styled("img")(() => ({
  width: "75%",
  verticalAlign: "middle",
  borderRadius: "30px",
  zIndex: 2,
  position: "relative",
}));

const BoxManImage = styled(Box)(() => ({
  marginTop: "25%",
  textAlign: "right",
  position: "relative",
  img: {
    width: "72%",
    verticalAlign: "middle",
    borderRadius: "30px",
    zIndex: 2,
    position: "relative",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "calc(28% - 30px)",
    top: "-30px",
    zIndex: 1,
    height: "100%",
    width: "75%",
    backgroundColor: "#eac87c",
    borderRadius: "30px",
  },
}));

const BoxWomanImage = styled(Box)(() => ({
  position: "absolute",
  right: "-150px",
  bottom: "70px",
  textAlign: "right",
  img: {
    width: "85%",
    borderRadius: "50%",
    position: "relative",
    zIndex: 2,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: "-40px",
    top: "-40px",
    zIndex: 1,
    height: "400px",
    width: "200px",
    borderRadius: "0px 200px 200px 0px",
    backgroundColor: " rgba(255, 255, 255, 0.6)",
  },
}));

const BoxJobCountries = styled(Card)(() => ({
  display: "inline-block",
  padding: "15px",
  position: "absolute",
  bottom: "70px",
  left: "180px",
  zIndex: 3,
}));

const BoxJobCompanies = styled(Card)(() => ({
  display: "inline-block",
  padding: "15px",
  position: "absolute",
  left: "50px",
  top: "25%",
  zIndex: 3,
}));

const BoxJobDone = styled(Card)(() => ({
  display: "inline-block",
  padding: "15px",
  position: "absolute",
  top: "50%",
  left: "100px",
  zIndex: 3,
}));

const Span = styled("span")(() => ({
  color: "#1967d2",
  fontSize: "66px",
  lineHeight: "72px",
  fontWeight: 500,
  textDecoration: "underline",
  "@media (max-width:1024px)": {
    fontSize: "20px",
    lineHeight: "25px",
  },
}));

export {
  BoxBackground, BoxJobCompanies, BoxJobCountries, BoxJobDone, BoxManImage,
  BoxWomanImage, ManPic, Span
};
