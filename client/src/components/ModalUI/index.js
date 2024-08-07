import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import axios from "axios";
import swal from 'sweetalert';

const CreateInstructorModal = ({ open, handleClose, refreshInstructors }) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    address: "",
    city: "",
    provinceCode: "",
    zipCode: "",
  };

  const initialErrorState = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    address: "",
    city: "",
    provinceCode: "",
    zipCode: "",
    common: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/provinces`);
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    for (const [fieldName, value] of Object.entries(form)) {
      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Submit form if no errors
    try {
      const response = await fetch(`${SERVER_URL}/api/instructors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          gender: form.gender,
          password: form.password,
          address: form.address,
          city: form.city,
          province_code: form.provinceCode,
          zip_code: form.zipCode,
          country: "CANADA",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, email: data.error }));
          swal("Error", data.error, "error");
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.message }));
          swal("Error", data.message, "error");
        }
      } else {
        handleModalClose();
        refreshInstructors();
        swal("Success", "Instructor created successfully", "success");
      }
    } catch (error) {
      setErrors({ common: "Registration failed. Please try again." });
      swal("Error", "Registration failed. Please try again.", "error");
    }
  };

  const handleClear = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
      address: "",
      city: "",
      provinceCode: "",
      zipCode: "",
    });
    setErrors({});
  };

  const handleModalClose = () => {
    handleClose();
    setForm(initialFormState);
    setErrors(initialErrorState);
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <ModalBox>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Create New Instructor</Typography>
          <Button variant="outlined" onClick={handleModalClose}>
            Back to Instructor Page
          </Button>
        </Box>
        <Form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" mb={2}>
                  Set up Credentials
                </Typography>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.gender}
                  sx={{ mt: 0 }}
                >
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
                  {errors.gender && (
                    <FormHelperText>{errors.gender}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <Alert severity="info">
                  Password must be shared with the instructor. Please note that
                  the password is not encrypted at this stage.{" "}
                  <b>
                    You must note down the password and share it with the
                    instructor.
                  </b>
                </Alert>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h6" mb={2}>
                  Mailing Address
                </Typography>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.provinceCode}
                  sx={{ mt: 0 }}
                >
                  <InputLabel id="province-label">Province</InputLabel>
                  <Select
                    labelId="province-label"
                    id="provinceCode"
                    name="provinceCode"
                    value={form.provinceCode}
                    onChange={handleChange}
                    label="Province"
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province.code} value={province.code}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.provinceCode && (
                    <FormHelperText>{errors.provinceCode}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value="CANADA"
                  InputProps={{
                    readOnly: true,
                  }}
                  margin="normal"
                  sx={{ backgroundColor: "#f0f0f0", mt: "0" }}
                />
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleChange}
                  margin="normal"
                  sx={{ mt: "0" }}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                />
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create New Instructor
            </Button>
          </Box>
        </Form>
      </ModalBox>
    </Modal>
  );
};

CreateInstructorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refreshInstructors: PropTypes.func.isRequired,
};

export default CreateInstructorModal;

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background-color: white;
  box-shadow: 24;
  padding: 16px;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;
