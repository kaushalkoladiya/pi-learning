"use client";

import React, { useState, useEffect } from "react";

import "./styles.css";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link
} from "@mui/material";

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { validateForm } from "@/utils/validation";
import CryptoJS from "crypto-js";
import { fetchSecretKey, registerUser } from "@/api";
import { styled } from '@mui/system';

const BackgroundImage = styled('div')({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(/images/learning-background.png)',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const TransparentPaper = styled(Paper)({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)', 
  zIndex: 1, 
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
});

const LeftContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '15px',
});

const RightContainer = styled(Box)({
  flex: 1,
  paddingRight: '15px',
});

const Divider = styled('div')({
  position: 'absolute',
  left: '45%',
  top: '10%',
  bottom: '10%',
  width: '3px',
  backgroundColor: '#ccc',
  zIndex: 2,
});

const StyledLink = styled(Link)({
  textDecoration: 'underline',
  color: '#1976d2',
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    borderRadius: '4px',
    padding: '8px 8px',
  },
});

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    (async () => {
      setSecretKey(await fetchSecretKey());
    })();
  }, []);

  const encryptPassword = (password) => {
    if (!secretKey) {
      console.error("Secret key is not available for encryption");
      return password;
    }
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = validateForm(form);

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    // Encrypt the password before sending it
    const encryptedPassword = encryptPassword(form.password);
    console.log("Encrypted Password:", encryptedPassword);

    try {
      await registerUser(
        form.email,
        encryptedPassword,
        form.firstName,
        form.lastName,
        form.gender,
      )

      console.log("User registered");
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed");

      if (error.response && error.response.data && error.response.data.errors) {
        setFieldErrors(error.response.data.errors);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const handleClear = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
    setFieldErrors({});
    setError("");
  };

  return (
    <BackgroundImage>
      <TransparentPaper elevation={6}>
        <LeftContainer>
          <img src="/images/pi-learning-logo.png" alt="PI Learning Logo" style={{ width: '100%', maxWidth: "500px" }} />
        </LeftContainer>
        <Divider />
        <RightContainer>
          <Box component="form" onSubmit={handleSignup} sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 2 }}
            >
              Create Account
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  autoFocus
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={handleChange}
                  error={!!fieldErrors.firstName}
                  helperText={fieldErrors.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={handleChange}
                  error={!!fieldErrors.lastName}
                  helperText={fieldErrors.lastName}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!fieldErrors.password}
                  helperText={fieldErrors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={!!fieldErrors.confirmPassword}
                  helperText={fieldErrors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal" error={!!fieldErrors.gender}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {fieldErrors.gender && (
                <FormHelperText>{fieldErrors.gender}</FormHelperText>
              )}
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={handleClear}
                  sx={{ mt: 2, mb: 2 }}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <StyledLink href="#" underline="hover" onClick={() => router.push('/auth/login')}>
                  {"Already have an account? LOGIN"}
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </RightContainer>
      </TransparentPaper>
    </BackgroundImage>
  );
};

export default Signup;
