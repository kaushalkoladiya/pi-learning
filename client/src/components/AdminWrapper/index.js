import { Box, Container, CssBaseline } from '@mui/material'
import React from 'react'
import AdminNavbar from '../Navbar/AdminNavbar'

const AdminWrapper = ({ children }) => {
  return (
    <Box>
      <AdminNavbar />
      <CssBaseline />
      <Box
        marginTop="64px"
        marginLeft="240px"
        p={2}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AdminWrapper