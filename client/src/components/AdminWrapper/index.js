import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'

const AdminWrapper = ({ children }) => {
  return (
    <Box>
      <Navbar />
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