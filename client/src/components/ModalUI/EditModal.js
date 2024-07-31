import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import swal from "sweetalert";

const EditModal = ({ open, handleClose, userData, addressData, refreshInstructors }) => {
  const [form, setForm] = useState({
    dateOfBirth: userData?.date_of_birth?.split('T')[0] || "",
    phoneNumber: userData.phone_number || "",
    homeCountry: userData.home_country || "",
    departmentCode: userData.department_code || "",
    introduction: userData.biography || "",
    address: addressData.address || "",
    city: addressData.city ||"",
    provinceCode: addressData.province_code || "",
    zipCode: addressData.zip_code || "",
    profilePic: null,
    profilePicName: "",
  });
  console.log("Initial form state:", form);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/provinces`);
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchDepartments();
    fetchCountries();
    fetchProvinces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      profilePic: e.target.files[0],
      profilePicName: e.target.files[0].name,
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", form.profilePic);

    try {
      const response = await axios.post(`${SERVER_URL}/api/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageURL = 'https://pilearningcapstone.blob.core.windows.net/pi-learning/' + response.data[0].blobName;
      console.log(imageURL);
      setForm((prevForm) => ({
        ...prevForm,
        profilePicName: "",
        profilePicUrl: imageURL,
      }));
      swal("Success", "Upload Successfully", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      swal("Error", "Error uploading image", "error");
    }
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
      const response = await fetch(`${SERVER_URL}/api/instructors/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_of_birth: form.dateOfBirth,
        phone_number: form.phoneNumber,
        home_country: form.homeCountry,
        department_code: form.departmentCode,
        address: form.address,
        city: form.city,
        province_code: form.provinceCode,
        zip_code: form.zipCode,
        biography: form.introduction,
        profile_pic: form.profilePicUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: data.error }));
          swal("Error", data.error, "error");
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.message }));
          swal("Error", data.message, "error");
        }
      } else {
        handleClose();
        refreshInstructors();
        swal("Success", "Instructor updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      swal("Error", "Error updating user", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '80%',
          backgroundColor: "white",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" mb={2}>
          Edit Profile Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="h6">Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={userData.first_name}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={userData.last_name}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={userData.email}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Gender"
                      name="gender"
                      value={userData.gender}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">Additional Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                      InputProps={{
                        readOnly: true,
                      }}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.homeCountry}
                    >
                      <InputLabel id="country-label">Home Country</InputLabel>
                      <Select
                        labelId="country-label"
                        id="homeCountry"
                        name="homeCountry"
                        value={form.homeCountry}
                        onChange={handleChange}
                        label="Home Country"
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.homeCountry && (
                        <FormHelperText>{errors.homeCountry}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.departmentCode}
                    >
                      <InputLabel id="department-label">Department</InputLabel>
                      <Select
                        labelId="department-label"
                        id="departmentCode"
                        name="departmentCode"
                        value={form.departmentCode}
                        onChange={handleChange}
                        label="Department"
                      >
                        {departments.map((department) => (
                          <MenuItem
                            key={department.code}
                            value={department.code}
                          >
                            {department.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.departmentCode && (
                        <FormHelperText>{errors.departmentCode}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  height: "100%",
                  borderLeft: "1px solid #ddd",
                  marginLeft: 2,
                  marginRight: 2,
                }}
              ></Box>
            </Grid>
            <Grid item xs={5}>
              <Box mb={2}>
                <Typography variant="h6">Mailing Address</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      margin="normal"
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      margin="normal"
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.provinceCode}
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value="CANADA"
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      margin="normal"
                      error={!!errors.zipCode}
                      helperText={errors.zipCode}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">
                  Introduction and Profile Pic
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Introduction"
                      name="introduction"
                      value={form.introduction}
                      onChange={handleChange}
                      margin="normal"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="profile-pic"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="profile-pic">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                        {form.profilePicName && (
                          <Typography
                            variant="body1"
                            style={{ display: "inline", marginLeft: 10 }}
                          >
                            {form.profilePicName}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpload}
                          style={{ marginLeft: "69%" }}
                        >
                          Upload
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  refreshUsers: PropTypes.func.isRequired,
};

export default EditModal;
