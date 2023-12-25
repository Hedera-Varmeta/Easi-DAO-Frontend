import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

/* Override ⚛️ palette*/
export const getPaletteStyles = (
  mode: PaletteMode
): ThemeOptions["palette"] => ({
  mode,
  primary: {
    main: "#8364e2", // #46d09b
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#8364e2",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#111111",
    secondary: "#8364e2",
  },
  error: {
    main: "#F44061",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#D6B557",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#25C9A1",
    contrastText: "#FFFFFF",
  },
  grey: {
    "500": "#667085",
  },
  background: {
    default: mode === "dark" ? "#020710" : "#FFFFFF",
    paper: mode === "dark" ? "#FFFFFF" : "#FFFFFF",
  },
});
