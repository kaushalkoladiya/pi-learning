"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.css"; //SIGNUP CSS
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
} from "@mui/material";

import { useRouter } from "next/navigation";
import { validateForm } from "@/utils/validation";
import CryptoJS from "crypto-js";

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
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    const fetchSecretKey = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/token/key`
        );
        console.log("Fetched Secret Key:", response.data.secretKey);
        setSecretKey(response.data.secretKey);
      } catch (error) {
        console.error("Error fetching secret key:", error);
      }
    };

    fetchSecretKey();
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
      await axios.post(
        `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/auth/register`,
        {
          password: encryptedPassword,
          email: form.email,
          user_type: "student",
          first_name: form.firstName,
          last_name: form.lastName,
          gender: form.gender,
        }
      );
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

  return (
    <div className="auth-container-wrapper">
      <Box className="auth-container">
        <Box className="auth-image">
          <img
            src="/images/pi.jpg"
            alt="Description of "
            className="auth-image-content"
          />
        </Box>
        <Box
          className="auth-form-container"
          component={Paper}
          elevation={6}
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Box component="form" onSubmit={handleSignup} sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 2 }}
            >
              Sign Up
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
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
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={form.password}
              onChange={handleChange}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!fieldErrors.confirmPassword}
              helperText={fieldErrors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => router.push("/auth/login")}
                >
                  {"Already have an account? Sign In"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
