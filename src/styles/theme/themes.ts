import { createTheme } from "@mui/material/styles";

import { getComponentStyles } from "./themeComponents";
import { getPaletteStyles } from "./themePalette";
import { getTypoStyles } from "./themeTypo";

export const lightTheme = (language = "en") => {
  return createTheme({
    shape: {
      borderRadius: 5,
    },
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 768,
    //     md: 1024,
    //     lg: 1420,
    //     xl: 1920,
    //   },
    // },
    typography: getTypoStyles("light", language),
    components: getComponentStyles("light"),
    palette: getPaletteStyles("light"),
  });
};

export const darkTheme = (language = "en") => {
  return createTheme({
    shape: {
      borderRadius: 0,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1200,
        lg: 1400,
        xl: 1920,
      },
    },
    typography: getTypoStyles("dark", language),
    components: getComponentStyles("dark"),
    palette: getPaletteStyles("dark"),
  });
};
