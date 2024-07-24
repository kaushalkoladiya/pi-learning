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
    programId: programData.program_id || "",
    programTitle: programData.program_title || "",
    shortDescription: programData.short_description || "",
    longDescription: programData.long_description || "",
    price: programData.price || "",
    departmentCode: programData.department_code || "",
    durationInMonths: programData.duration_in_months || "",
    profilePic: null,
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
        short_description: form.shortDescription,
        long_description: form.longDescription,
        price: form.price,
        duration_in_months: form.durationInMonths,
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
                      name="programId"
                      value={form.programId}
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
                      name="programTitle"
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
                      name="durationInMonths"
                      value={form.durationInMonths}
                      onChange={handleChange}
                      margin="normal"
                      error={!!errors.durationInMonths}
                      helperText={errors.durationInMonths}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                      {errors.departmentCode && (
                        <FormHelperText>
                          {errors.departmentCode}
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
                      name="shortDescription"
                      value={form.shortDescription}
                      onChange={handleChange}
                      margin="normal"
                      multiline
                      rows={2}
                      error={!!errors.shortDescription}
                      helperText={errors.shortDescription}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Long Description"
                      name="longDescription"
                      value={form.longDescription}
                      onChange={handleChange}
                      margin="normal"
                      multiline
                      rows={4}
                      error={!!errors.longDescription}
                      helperText={errors.longDescription}
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
