"use client";

import React from 'react'
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
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
import { Box } from '@mui/material';
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

const AdminSidebar = () => {
  const { isUserAdmin, logout } = useAuth();
  const router = useRouter();

  const handleRoute = (path) => {
    router.push(path);
  };

  if (!isUserAdmin()) {
    return null;
  }

  return (
    <Drawer variant="permanent" open={true}>
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
                justifyContent: "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText
                primary={route.text}
                sx={{ opacity: 1 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
