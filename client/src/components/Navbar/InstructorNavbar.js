import { APP_NAME } from '@/constants'
import useAuth from '@/hooks/useAuth'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const InstructorNavbar = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const changeRoute = (path) => {
    router.push(path);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography variant="h6" noWrap>
            {APP_NAME}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button color="inherit" onClick={() => changeRoute('/profile')}>
              Profile
            </Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default InstructorNavbar