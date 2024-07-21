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
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
import { SERVER_URL } from "@/constants/routes";
import { validateForm } from "@/utils/validation";

const EditProgramModal = ({
  open,
  handleClose,
  programData,
  refreshPrograms,
}) => {
  const [form, setForm] = useState({
    program_id: programData.program_id || "",
    program_title: programData.program_title || "",
    short_description: programData.short_description || "",
    long_description: programData.long_description || "",
    price: programData.price || "",
    department_code: programData.department_code || "",
    duration_in_months: programData.duration_in_months || "",
    profile_pic: null,
    profilePicName: "",
  });

  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
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
      profile_pic: e.target.files[0],
      profilePicName: e.target.files[0].name,
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", form.profile_pic);

    try {
      const response = await axios.post(`${SERVER_URL}/api/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageURL = 'https://pilearningcapstone.blob.core.windows.net/pi-learning/' + response.data[0].blobName;;
      setForm((prevForm) => ({
        ...prevForm,
        profilePicName: "",
        profilePicUrl: imageURL,
      }));
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.put(`${SERVER_URL}/api/programs/${programData.program_id}`, {
        short_description: form.short_description,
        long_description: form.long_description,
        price: form.price,
        duration_in_months: form.duration_in_months,
        profile_pic: form.profilePicUrl || programData.profile_pic,
      });
      handleClose();
      refreshPrograms();
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setForm((prevForm) => ({
      ...prevForm,
      profilePicName: "",
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          backgroundColor: "white",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" mb={2}>
          Edit Program Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="h6">Program Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Program ID"
                      name="program_id"
                      value={form.program_id}
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
                      label="Program Title"
                      name="program_title"
                      value={form.program_title}
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
                      label="Price"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      margin="normal"
                      error={!!errors.price}
                      helperText={errors.price}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Duration in Months"
                      name="duration_in_months"
                      value={form.duration_in_months}
                      onChange={handleChange}
                      margin="normal"
                      error={!!errors.duration_in_months}
                      helperText={errors.duration_in_months}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.department_code}
                    >
                      <InputLabel id="department-label">Department</InputLabel>
                      <Select
                        labelId="department-label"
                        id="department_code"
                        name="department_code"
                        value={form.department_code}
                        label="Department"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ backgroundColor: "#f0f0f0" }}
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
                      {errors.department_code && (
                        <FormHelperText>
                          {errors.department_code}
                        </FormHelperText>
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
                <Typography variant="h6">
                  Description and Profile Pic
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Short Description"
                      name="short_description"
                      value={form.short_description}
                      onChange={handleChange}
                      margin="normal"
                      multiline
                      rows={2}
                      error={!!errors.short_description}
                      helperText={errors.short_description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Long Description"
                      name="long_description"
                      value={form.long_description}
                      onChange={handleChange}
                      margin="normal"
                      multiline
                      rows={4}
                      error={!!errors.long_description}
                      helperText={errors.long_description}
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
                          style={{ marginLeft: "41%" }}
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Upload Successfully
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

EditProgramModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  programData: PropTypes.object.isRequired,
  refreshPrograms: PropTypes.func.isRequired,
};

export default EditProgramModal;
