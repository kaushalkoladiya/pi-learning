"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import "../signup/styles.css";
import { validateEmail } from "@/utils/validation";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { USER_ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { fetchSecretKey, loginUser } from "@/api";
import { styled } from "@mui/system";
import { PublicNavbar } from "@/app/page";

const BackgroundContainer = styled("div")({
  position: "relative",
  backgroundImage: "url(/images/learning-background.png)",
  backgroundSize: "contain",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});

const TransparentPaper = styled(Paper)(({ theme }) => ({
  zIndex: 2,
  backgroundColor: "rgba(240, 248, 255, 0.8)",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
}));

const LoginBox = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  zIndex: 1,
});

const StyledLink = styled(Link)({
  textDecoration: "underline",
  color: "#1976d2",
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "#1976d2",
    color: "white",
    borderRadius: "4px",
    padding: "8px 8px",
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    (async () => {
      setSecretKey(await fetchSecretKey());
    })();
  }, []);

  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    // Encrypt the password before sending it
    const encryptedPassword = encryptPassword(password);

    try {
      const response = await loginUser(email, encryptedPassword);
      const { token, user } = response.data;
      const user_type = user.user_type;
      // Save token and user type in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user_type);
      localStorage.setItem("firstName", user.first_name);
      localStorage.setItem("lastName", user.last_name);
      localStorage.setItem("profilePic", user.profile_pic);
      // Dispatch user info to Redux store
      dispatch(setUser({ token, user_type }));

      // Redirect based on user type
      if (user_type === USER_ROLES.ADMIN) {
        navigate.push(ROUTES.ADMIN);
      } else if (user_type === USER_ROLES.INSTRUCTOR) {
        navigate.push(ROUTES.INSTRUCTOR);
      } else if (user_type === USER_ROLES.STUDENT) {
        navigate.push(ROUTES.STUDENT);
      }
    } catch (error) {
      console.error("Invalid credentials");
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box>
      <PublicNavbar />

      <BackgroundContainer>
        <TransparentPaper elevation={6}>
          <LoginBox>
            <img
              src="/images/pi-learning-logo.png"
              alt="PI Learning Logo"
              style={{
                height: "150px",
                display: "block",
                margin: "0 auto 0px auto",
              }}
            />
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 2 }}
            >
              Welcome Back
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                LOGIN
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item />
                <Grid item>
                  <StyledLink
                    href="#"
                    underline="hover"
                    onClick={() => navigate.push("/auth/signup")}
                  >
                    {"Don't have an account? Sign Up"}
                  </StyledLink>
                </Grid>
              </Grid>
            </Box>
          </LoginBox>
        </TransparentPaper>
      </BackgroundContainer>
    </Box>
  );
};

export default Login;
