"use client";

import React from 'react'
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';

import Person4Icon from '@mui/icons-material/Person4';
import SubjectIcon from '@mui/icons-material/Subject';
import { Box, Button } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { APP_NAME } from '@/constants';
import { SchoolSharp } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const NavbarDrawer = () => {
  const { isUserAdmin } = useAuth();

  if (!isUserAdmin()) {
    return null;
  }

  return <DrawerHeader />;
};

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ADMIN_ROUTES = [
  {
    text: "Instructor",
    icon: <Person4Icon />,
    path: "/admin/instructor",
  },
  {
    text: "Programs",
    icon: <SchoolSharp />,
    path: "/admin/program",
  },
  {
    text: "Course",
    icon: <SubjectIcon />,
    path: "/admin/course",
  },
  {
    text: "Lesson",
    icon: <MenuBookIcon />,
    path: "/admin/lessons",
  },
  {
    text: "Assingments",
    icon: <AssignmentIcon />,
    path: "/admin/assignments",
  },
];

const AdminNavbar = () => {
  const { isUserAdmin, logout } = useAuth();
  const router = useRouter();

  const handleRoute = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login/");
  };

  const changeRoute = (path) => {
    router.push(path);
  };

  if (!isUserAdmin()) {
    return null;
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {APP_NAME}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ marginLeft: "auto" }}>
            <Button color="inherit" onClick={() => changeRoute('/profile')}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box width={"100%"} pl={2}>
            <Typography variant="h6" noWrap component="div">
              {APP_NAME}
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {ADMIN_ROUTES.map((route, index) => (
            <ListItem
              key={route.text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleRoute(route.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
