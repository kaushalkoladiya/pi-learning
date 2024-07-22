"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar, { NavbarDrawer } from "@/components/Navbar";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { usePathname } from "next/navigation";
import { StoreProvider } from "@/redux/store";
import { APP_NAME } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: APP_NAME,
  description: `Learn with ${APP_NAME}`,
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
            <div sx={{ display: "flex" }}>
            {!isSignupLoginPage && <Navbar />}
              <Box component="main" sx={{ flexGrow: 1 }}>
                <NavbarDrawer />
                <div>
                  {children}
                </div>
              </Box>
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
