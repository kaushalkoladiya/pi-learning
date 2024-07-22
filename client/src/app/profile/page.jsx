'use client';

import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, Avatar } from '@mui/material';
import swal from 'sweetalert';
import { getCountries, getDepartments, getProfile, getProvinces, updateProfile, uploadFile } from '@/api';
import { AZURE_BASE_URL } from '@/constants';
import ProfileBanner from '@/components/profile/ProfileBanner';
import authMiddleware from '@/utils/authRoute';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone_number: '',
    home_country: '',
    department_code: '',
    address: '',
    city: '',
    province_code: '',
    zip_code: '',
    biography: '',
    profile_pic: '',
  });

  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();

        setProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: data.date_of_birth.split('T')[0],
          gender: data.gender,
          phone_number: data.phone_number,
          home_country: data.home_country,
          department_code: data.department_code,
          biography: data.biography,
          profile_pic: data.profile_pic,

          address: data.user_address.address,
          city: data.user_address.city,
          province_code: data.user_address.province_code,
          zip_code: data.user_address.zip_code,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchMetadata = async () => {
      try {
        const [countriesResponse, departmentsResponse, provincesResponse] = await Promise.all([
          getCountries(),
          getDepartments(),
          getProvinces(),
        ]);
        setCountries(countriesResponse.data);
        setDepartments(departmentsResponse.data);
        setProvinces(provincesResponse.data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchProfile();
    fetchMetadata();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = async (e) => {
    try {
      const { data } = await uploadFile(e.target.files[0]);
      const profilePic = AZURE_BASE_URL + data[0].blobName;

      setProfile({ ...profile, profile_pic: profilePic });
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        date_of_birth: profile.date_of_birth,
        gender: profile.gender,
        phone_number: profile.phone_number,
        home_country: profile.home_country,
        department_code: profile.department_code,
        address: profile.address,
        city: profile.city,
        province_code: profile.province_code,
        zip_code: profile.zip_code,
        biography: profile.biography,
        profile_pic: profile.profile_pic,
      };

      await updateProfile(payload);

      swal({
        title: 'Success',
        text: 'Profile updated successfully',
        icon: 'success',
      });
    } catch (error) {
      setErrors({ submit: error?.response?.data?.error || 'Error updating profile' });
      swal({
        title: 'Error',
        text: error?.response?.data?.error || 'Error updating profile',
        icon: 'error',
      });

    }
  };

  console.log('Profile:', profile);

  return (
    <Container>
      <ProfileBanner />
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      {errors.submit && (
        <Typography color="error" gutterBottom>
          {errors.submit}
        </Typography>
      )}
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Avatar src={profile.profile_pic} alt="Profile Picture" sx={{ width: 100, height: 100 }} />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Profile Picture
          <input
            type="file"
            hidden
            onChange={handleProfilePicChange}
            accept="image/*"
          />
        </Button>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box mb={4}>
          <Typography variant="h5">Details</Typography>
          <TextField
            label="First Name"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
          <TextField
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={profile.date_of_birth}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth}
          />
          <FormControl fullWidth margin="normal" required error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={profile.gender}
              defaultValue={profile.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error" variant="caption">
                {errors.gender}
              </Typography>
            )}
          </FormControl>
          <TextField
            label="Phone Number"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.phone_number}
            helperText={errors.phone_number}
          />
          <FormControl fullWidth margin="normal" required error={!!errors.home_country}>
            <InputLabel>Home Country</InputLabel>
            <Select
              name="home_country"
              value={profile.home_country}
              onChange={handleChange}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            {errors.home_country && (
              <Typography color="error" variant="caption">
                {errors.home_country}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" required error={!!errors.department_code}>
            <InputLabel>Department</InputLabel>
            <Select
              name="department_code"
              value={profile.department_code}
              onChange={handleChange}
            >
              {departments.map((department) => (
                <MenuItem key={department.code} value={department.code}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
            {errors.department_code && (
              <Typography color="error" variant="caption">
                {errors.department_code}
              </Typography>
            )}
          </FormControl>
          <TextField
            label="Biography"
            name="biography"
            value={profile.biography}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.biography}
            helperText={errors.biography}
          />
        </Box>
        <Box>
          <Typography variant="h5">Address</Typography>
          <TextField
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            label="City"
            name="city"
            value={profile.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.city}
            helperText={errors.city}
          />
          <FormControl fullWidth margin="normal" required error={!!errors.province_code}>
            <InputLabel>Province</InputLabel>
            <Select
              name="province_code"
              value={profile.province_code}
              onChange={handleChange}
            >
              {provinces.map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
            {errors.province_code && (
              <Typography color="error" variant="caption">
                {errors.province_code}
              </Typography>
            )}
          </FormControl>
          <TextField
            label="Zip Code"
            name="zip_code"
            value={profile.zip_code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.zip_code}
            helperText={errors.zip_code}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default authMiddleware(ProfileEdit);
