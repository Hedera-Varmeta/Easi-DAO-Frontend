import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { lightTheme } from "./themes";
import type { CustomThemeProviderProps } from "./types";

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const themeScheme = useMemo(() => {
    return lightTheme();
  }, []);

  return (
    <>
      <ThemeProvider theme={themeScheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}

export default CustomThemeProvider;
