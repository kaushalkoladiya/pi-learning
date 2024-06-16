'use client';

import { Box, styled, Typography } from '@mui/material'
import React from 'react'

const ViewInstructor = () => {
  return (
    <Box>
      <Box>
        View Instructor
      </Box>

      <Box>
        <ViewRow>
          <Typography variant='h6'>
            Username:
          </Typography>
          <Typography variant='body1'>
            instructor
          </Typography>
        </ViewRow>
      </Box>
    </Box>
  )
}

export default ViewInstructor

const ViewRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
});
