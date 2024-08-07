"use client";

import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, Avatar, Paper, Grid } from '@mui/material';
import swal from 'sweetalert';
import { getCountries, getDepartments, getProfile, getProvinces, updateProfile, uploadFile } from '@/api';
import { AZURE_BASE_URL } from '@/constants';
import authMiddleware from '@/utils/authRoute';
import Navbar from '@/components/Navbar';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const ProfileEdit = () => {
  const { isUserAdmin } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone_number: '',
    // home_country: '',
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
        console.log("Profile data:", data);

        setProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: data?.date_of_birth?.split("T")[0],
          gender: data.gender,
          phone_number: data.phone_number,
          // home_country: data.home_country,
          department_code: data.department_code,
          biography: data.biography,
          profile_pic: data.profile_pic,
          address: data?.user_address?.address,
          city: data?.user_address?.city,
          province_code: data?.user_address?.province_code,
          zip_code: data?.user_address?.zip_code,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchMetadata = async () => {
      try {
        const [countriesResponse, departmentsResponse, provincesResponse] =
          await Promise.all([getCountries(), getDepartments(), getProvinces()]);
        setCountries(countriesResponse.data);
        setDepartments(departmentsResponse.data);
        setProvinces(provincesResponse.data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
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
      console.log("Error updating profile picture:", error);
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
        // home_country: profile.home_country,
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
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
      });
    } catch (error) {
      setErrors({
        submit: error?.response?.data?.error || "Error updating profile",
      });
      swal({
        title: "Error",
        text: error?.response?.data?.error || "Error updating profile",
        icon: "error",
      });
    }
  };

  return (
    <Container>
      <Navbar />
      <Paper elevation={3} sx={{ p: 4, mt: 12, mb: 4, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom align="center">
          Edit Profile
        </Typography>
        {errors.submit && (
          <Typography color="error" gutterBottom>
            {errors.submit}
          </Typography>
        )}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            src={profile.profile_pic}
            alt="Profile Picture"
            sx={{ width: 100, height: 100 }}
          />
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
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.first_name}
                helperText={errors.first_name}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.last_name}
                helperText={errors.last_name}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={profile.date_of_birth}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.date_of_birth}
                helperText={errors.date_of_birth}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  inputProps={{
                    readOnly: true,
                  }}
                  sx={{ backgroundColor: "#e0e0e0" }}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone_number"
                value={profile.phone_number}
                onChange={handleChange}
                fullWidth
                error={!!errors.phone_number}
                helperText={errors.phone_number}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.home_country}>
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
            </Grid>
            {!isUserAdmin && (
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  error={!!errors.department_code}
                >
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department_code"
                    value={profile.department_code}
                    onChange={handleChange}
                    inputProps={{
                      readOnly: true,
                    }}
                    sx={{ backgroundColor: "#e0e0e0" }}
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
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Biography"
                name="biography"
                value={profile.biography}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                error={!!errors.biography}
                helperText={errors.biography}
              />
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography variant="h5" mb={2}>
              Address
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  error={!!errors.province_code}
                >
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip Code"
                  name="zip_code"
                  value={profile.zip_code}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.zip_code}
                  helperText={errors.zip_code}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default authMiddleware(ProfileEdit);
