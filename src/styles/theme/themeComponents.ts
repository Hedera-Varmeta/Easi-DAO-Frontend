import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

/* Override ⚛️ components*/
export const getComponentStyles = (
  mode: PaletteMode
): ThemeOptions["components"] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '999px',
        textTransform: "initial",
        fontSize: 14,
        minWidth: '100px',
      //   fontWeight: 500,
      //   background: "#8364e2",
      //   color: "#fff",
      //   padding: "2px 20px",
      //   "&:hover": {
      //     background: "#8364e2",
      //     boxShadow: "2px 2px 20px 0 rgba(131,100,226,.5)",
      //   },
      },
      sizeSmall: {},
      sizeLarge: {
        minHeight: 48,
        fontSize: 14,
        fontWeight: 500,
      },
      // outlinedPrimary: {
      //   border: "none",
      // },
      containedSecondary: {
        "&:hover": {},
      },
      containedPrimary: {
        // backgroundColor: '#000',
        // color: '#fff',
      }
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
        border: "1px solid #EAECF0",
        boxShadow: "none",
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        "&.Mui-expanded::before": {
          opacity: 1,
        },
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        "&.MuiAvatarGroup-avatar": {},
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: "#111",
      },
      shrink: {},
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        // borderColor: "#FFFFFF",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {
        borderRadius: '14px'
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {},
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow:
          "0px -1px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        backgroundColor: "#ffffff",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        height: 48,
      },
      input: {
        height: 48,
      }
    }
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        height: 48,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        backgroundColor: "#ffffff",
      },
    }
  }
});
