import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import BackButton from '../BackButton';

const BannerContainer = styled(Box)({
  backgroundColor: '#333',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
  marginBottom: '20px',
  position: 'relative',
});

const ProfileBanner = () => {
  return (
    <BannerContainer>
      <BackButton />
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
    </BannerContainer>
  );
};

export default ProfileBanner;
