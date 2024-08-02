import { APP_NAME } from '@/constants'
import useAuth from '@/hooks/useAuth'
import { AppBar as MuiAppBar, Box, Button, Toolbar, Typography, styled, Avatar,
  Menu,
  MenuItem,
  IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
  const { logout, isUserStudent, isUserAdmin, isUserInstructor } = useAuth();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const firstName = localStorage.getItem('firstName') || '';
  const lastName = localStorage.getItem('lastName') || '';
  const profilePic = localStorage.getItem('profilePic');

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
                <>
                  <Button color="inherit" onClick={() => handleNavigation('/student')}>Home</Button>
                  <Button color="inherit" onClick={() => handleNavigation('/courses')}>Courses</Button>
                </>
              )}
              <IconButton color="inherit" onClick={handleMenuOpen}>
                {profilePic ? (
                  <Avatar src={profilePic} alt="Profile Picture" />
                ) : (
                  <Avatar>
                    {getInitials(firstName, lastName)}
                  </Avatar>
                )}
              </IconButton>
              <Box ml={1} onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>
                <Typography variant="body1">{firstName} {lastName}</Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleRoute('/profile')}>Manage Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
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