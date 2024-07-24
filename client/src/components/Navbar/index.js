import { APP_NAME } from '@/constants'
import useAuth from '@/hooks/useAuth'
import { AppBar as MuiAppBar, Box, Button, Toolbar, Typography, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import AdminSidebar from './AdminSidebar'


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = () => {
  const router = useRouter();
  const { logout, isUserStudent, isUserAdmin } = useAuth();

  const handleRoute = (path) => {
    router.push(path);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="h6" noWrap>
              {APP_NAME}
            </Typography>
            <Box display="flex" alignItems="center">
              {isUserStudent() && (
                <Button color="inherit" onClick={() => handleRoute('/courses')}>Courses</Button>
              )}
              <Button color="inherit" onClick={() => handleRoute('/profile')}>
                Profile
              </Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {
        isUserAdmin() && (
          <AdminSidebar />
        )
      }
    </>
  )
}

export default Navbar