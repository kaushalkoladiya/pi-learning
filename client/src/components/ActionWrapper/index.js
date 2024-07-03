import { Box } from '@mui/material'
import React from 'react'

const ActionWrapper = ({ children }) => {
  return (
    <Box gap={2} display={'flex'}>
      {children}
    </Box>
  )
}

export default ActionWrapper