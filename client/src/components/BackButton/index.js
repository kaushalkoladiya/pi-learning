import React from 'react'
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const router = useRouter();
  return (
    <IconButton sx={{
      position: 'absolute',
      top: '0.5rem',
      left: '0.5rem',
      zIndex: 1000,
    }} onClick={() => router.back()}><ArrowBackIcon htmlColor='#fff' /></IconButton>
  )
}

export default BackButton