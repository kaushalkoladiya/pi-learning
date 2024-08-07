"use client"

import { Inter } from "next/font/google";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { StoreProvider } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0}} className={inter.className}>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
