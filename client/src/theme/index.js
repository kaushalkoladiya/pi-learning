'use client';

import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          marginBottom: '1rem'
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1rem'
        }
      }
    },
  }
});