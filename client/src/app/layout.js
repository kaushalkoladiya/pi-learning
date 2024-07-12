"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar, { DrawerHeader } from "@/components/Navbar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Pi Learning",
  description: "Learn with Pi Learning",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();  // Initialize useRouter
  // Check if the current route is not signup
  const isSignupLoginPage = pathname == "/auth/signup" || pathname =='/auth/login';
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              {!isSignupLoginPage && <Navbar />}
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
