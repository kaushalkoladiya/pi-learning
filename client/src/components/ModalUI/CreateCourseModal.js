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
  IconButton,
  Snackbar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import axios from "axios";

const CreateCourseModal = ({ open, handleClose, refreshCourses }) => {
  const initialFormState = {
    courseTitle: "",
    programId: "",
    instructorId: "",
    shortDescription: "",
    longDescription: "",
    profilePic: null,
    profilePicName: "",
  };

  const initialErrorState = {
    courseTitle: "",
    programId: "",
    instructorId: "",
    shortDescription: "",
    longDescription: "",
    common: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [programs, setPrograms] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/programs`);
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/instructors`);
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchPrograms();
    fetchInstructors();
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
      setForm((prevForm) => ({
        ...prevForm,
        profilePicUrl: imageURL,
      }));
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error uploading image:", error);
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
      const response = await fetch(`${SERVER_URL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_title: form.courseTitle,
          program_id: form.programId,
          instructor_id: form.instructorId,
          short_description: form.shortDescription,
          long_description: form.longDescription,
          profile_pic: form.profilePicUrl,
        }),
      });

      const data = await response.json();
      console.log(data.error);
      if (!response.ok) {
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.error }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.message }));
        }
      } else {
        handleModalClose();
        refreshCourses();
      }
    } catch (error) {
      setErrors({ common: "Registration failed. Please try again." });
    }
  };

  const handleClear = () => {
    setForm({
      courseTitle: "",
      programId: "",
      instructorId: "",
      shortDescription: "",
      longDescription: "",
      profilePic: null,
      profilePicName: "",
    });
    setErrors({});
  };

  const handleModalClose = () => {
    handleClose();
    setForm(initialFormState);
    setErrors(initialErrorState);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <ModalBox>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Create New Course</Typography>
          <Button variant="outlined" onClick={handleModalClose}>
            Back to Course Page
          </Button>
        </Box>
        <Form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" mb={2}>
                  Course Information
                </Typography>
                <TextField
                  fullWidth
                  label="Course Title"
                  name="courseTitle"
                  value={form.courseTitle}
                  onChange={handleChange}
                  error={!!errors.courseTitle}
                  helperText={errors.courseTitle}
                />
                <FormControl fullWidth margin="normal" error={!!errors.programId}>
                  <InputLabel id="program-label">Program</InputLabel>
                  <Select
                    labelId="program-label"
                    id="programId"
                    name="programId"
                    value={form.programId}
                    onChange={handleChange}
                    label="Program"
                  >
                    {programs.map((program) => (
                      <MenuItem key={program.program_id} value={program.program_id}>
                        {program.program_title}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.programId && (
                    <FormHelperText>{errors.programId}</FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth margin="normal" error={!!errors.instructorId}>
                  <InputLabel id="instructor-label">Instructor</InputLabel>
                  <Select
                    labelId="instructor-label"
                    id="instructorId"
                    name="instructorId"
                    value={form.instructorId}
                    onChange={handleChange}
                    label="Instructor"
                  >
                    {instructors.map((instructor) => (
                      <MenuItem key={instructor.id} value={instructor.id}>
                        {`${instructor.first_name} ${instructor.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.instructorId && (
                    <FormHelperText>{errors.instructorId}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 auto', height: '100%', mr:'50%'}} />
            </Grid>
            <Grid item xs={5}>
              <Box>
                <Typography variant="h6" mb={2}>
                  Course Description
                </Typography>
                <TextField
                  fullWidth
                  label="Short Description"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  error={!!errors.shortDescription}
                  helperText={errors.shortDescription}
                  multiline
                  rows={2}
                />
                <TextField
                  fullWidth
                  label="Long Description"
                  name="longDescription"
                  value={form.longDescription}
                  onChange={handleChange}
                  error={!!errors.longDescription}
                  helperText={errors.longDescription}
                  multiline
                  rows={4}
                />
                <Box mt={2}>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    sx={{ ml: '69%' }}
                  >
                    Upload
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create New Course
            </Button>
          </Box>
        </Form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
            Upload Successfully
          </Alert>
        </Snackbar>
      </ModalBox>
    </Modal>
  );
};

CreateCourseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refreshCourses: PropTypes.func.isRequired,
};

export default CreateCourseModal;

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px; /* Adjusted width */
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
