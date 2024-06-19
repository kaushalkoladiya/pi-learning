import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar, { DrawerHeader } from "@/components/Navbar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pi Learning",
  description: "Learn with Pi Learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box>
                  {children}
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
