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

const EditCourseModal = ({ open, handleClose, courseData, refreshCourses }) => {
  const [form, setForm] = useState({
    course_id: courseData.course_id || "",
    course_title: courseData.course_title || "",
    program_id: courseData.program_id || "",
    instructor_id: courseData.instructor_id || "",
    short_description: courseData.short_description || "",
    long_description: courseData.long_description || "",
    profile_pic: null,
    profilePicName: "",
  });

  const [errors, setErrors] = useState({});
  const [instructors, setInstructors] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/instructors`);
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/programs`);
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
    fetchPrograms();
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
      await axios.put(`${SERVER_URL}/api/courses/${courseData.course_id}`, {
        instructor_id: form.instructor_id,
        short_description: form.short_description,
        long_description: form.long_description,
        profile_pic: form.profilePicUrl,
      });
      handleClose();
      refreshCourses();
    } catch (error) {
      console.error("Error updating course:", error);
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
          width: 1000,
          backgroundColor: "white",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" mb={2}>
          Edit Course Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="h6">Course Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Course ID"
                      name="course_id"
                      value={form.course_id}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Course Title"
                      name="course_title"
                      value={form.course_title}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                      error={!!errors.course_title}
                      helperText={errors.course_title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.program_id}
                    >
                      <InputLabel id="program-label">Program</InputLabel>
                      <Select
                        labelId="program-label"
                        id="program_id"
                        name="program_id"
                        value={form.program_id}
                        onChange={handleChange}
                        label="Program"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ backgroundColor: "#f0f0f0" }}
                      >
                        {programs.map((program) => (
                          <MenuItem
                            key={program.program_id}
                            value={program.program_id}
                          >
                            {`${program.program_title}`}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.program_id && (
                        <FormHelperText>{errors.program_id}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.instructor_id}
                    >
                      <InputLabel id="instructor-label">Instructor</InputLabel>
                      <Select
                        labelId="instructor-label"
                        id="instructor_id"
                        name="instructor_id"
                        value={form.instructor_id}
                        onChange={handleChange}
                        label="Instructor"
                      >
                        {instructors.map((instructor) => (
                          <MenuItem key={instructor.id} value={instructor.id}>
                            {`${instructor.first_name} ${instructor.last_name}`}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.instructor_id && (
                        <FormHelperText>{errors.instructor_id}</FormHelperText>
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
                      rows={4} // Increased the width of textarea
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
                      rows={6} // Increased the width of textarea
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
                          style={{ marginLeft: "56%" }}
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

EditCourseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  courseData: PropTypes.object.isRequired,
  refreshCourses: PropTypes.func.isRequired,
};

export default EditCourseModal;
