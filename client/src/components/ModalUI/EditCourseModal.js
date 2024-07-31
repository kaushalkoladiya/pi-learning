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
import { validateForm } from "@/utils/validation";
import swal from "sweetalert";

const EditCourseModal = ({ open, handleClose, courseData, refreshCourses }) => {
  const [form, setForm] = useState({
    courseId: courseData.course_id || "",
    courseTitle: courseData.course_title || "",
    programId: courseData.program_id || "",
    instructorId: courseData.instructor_id || "",
    shortDescription: courseData.short_description || "",
    longDescription: courseData.long_description || "",
    profilePic: null,
    profilePicName: "",
  });

  const [errors, setErrors] = useState({});
  const [instructors, setInstructors] = useState([]);
  const [programs, setPrograms] = useState([]);

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
      swal("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      swal("Error", "Error uploading image. Please try again.", "error");
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
        instructor_id: form.instructorId,
        short_description: form.shortDescription,
        long_description: form.longDescription,
        profile_pic: form.profilePicUrl,
      });
      handleClose();
      refreshCourses();
      swal("Success", "Course updated successfully!", "success");
    } catch (error) {
      console.error("Error updating course:", error);
      swal("Error", "Error updating course. Please try again.", "error");
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
          width: '60%',
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
                      name="courseId"
                      value={form.courseId}
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
                      name="courseTitle"
                      value={form.courseTitle}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                      sx={{ backgroundColor: "#f0f0f0" }}
                      error={!!errors.courseTitle}
                      helperText={errors.courseTitle}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.programId}
                    >
                      <InputLabel id="program-label">Program</InputLabel>
                      <Select
                        labelId="program-label"
                        id="programId"
                        name="programId"
                        value={form.programId}
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
                      {errors.programId && (
                        <FormHelperText>{errors.programId}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.instructorId}
                    >
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
                      rows={4}
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
                      rows={6}
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
