import { PaletteMode } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";

const { typography, breakpoints } = createTheme({
  typography: { fontSize: 14 },

});

const LANG_MAPPING: Record<string, string> = {
  en: "DM Sans",
  ch: "Space Grotesk",
  ja: "Space Grotesk",
};

/* Override ⚛️ typo*/
export const getTypoStyles = (
  mode: PaletteMode,
  lang: string
): ThemeOptions["typography"] => ({
  fontSize: 16,
  fontFamily: [
    LANG_MAPPING[lang] ?? "Inter",
    "Arial",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  h1: {
    fontWeight: 700,
    fontSize: typography.pxToRem(50),
    lineHeight: typography.pxToRem(60),
    // '@media (max-width:1024px)': {
    //   fontSize: '1.5rem',
    // },
  },
  h2: {
    fontWeight: 700,
    fontSize: typography.pxToRem(36),
    lineHeight: typography.pxToRem(46),
    '@media (max-width:1024)': {
      fontSize: '1.5rem',
    },
  },
  h3: {
    fontWeight: 600,
    fontSize: typography.pxToRem(30),
    lineHeight: typography.pxToRem(34),
  },
  h4: {
    fontWeight: 600,
    fontSize: typography.pxToRem(24),
    lineHeight: typography.pxToRem(28),
  },
  h5: {
    fontWeight: 600,
    fontSize: typography.pxToRem(18),
    lineHeight: typography.pxToRem(21),
  },
  h6: {
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
    lineHeight: typography.pxToRem(20),
  },
  subtitle1: {
    fontSize: typography.pxToRem(16),
    lineHeight: typography.pxToRem(25),
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: typography.pxToRem(16),
    lineHeight: typography.pxToRem(21),
  },
  body1: {
    fontSize: typography.pxToRem(14),
    lineHeight: typography.pxToRem(16),
    fontWeight: 400,
  },
  body2: {
    fontSize: typography.pxToRem(16),
    lineHeight: typography.pxToRem(20),
    fontWeight: 400,
  },
  button: {
    fontSize: typography.pxToRem(16),
    fontWeight: 400,
  },
  caption: {
    fontSize: typography.pxToRem(12),
    lineHeight: typography.pxToRem(18),
    [breakpoints.down("xs")]: {
      fontSize: typography.pxToRem(10),
    },
  },
  overline: {
    fontSize: typography.pxToRem(16),
    fontWeight: 400,
    textTransform: "uppercase",
  },
});
