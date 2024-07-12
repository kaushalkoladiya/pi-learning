"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar, { NavbarDrawer } from "@/components/Navbar";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { usePathname } from "next/navigation";
import { StoreProvider } from "@/redux/store";

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
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <NavbarDrawer />
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
