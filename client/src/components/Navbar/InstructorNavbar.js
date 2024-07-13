import { APP_NAME } from '@/constants'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

const InstructorNavbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#2e2e2e',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography variant="h6" noWrap>
            {APP_NAME}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button color="inherit" href="#">Logout</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default InstructorNavbar