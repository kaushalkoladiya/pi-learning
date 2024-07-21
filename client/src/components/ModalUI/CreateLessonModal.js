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
  Snackbar,
} from "@mui/material";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import axios from "axios";

const CreateLessonModal = ({ open, handleClose, refreshLessons }) => {
  const [form, setForm] = useState({
    lessonId: "",
    lessonName: "",
    lessonDescription: "",
    programId: "",
    courseId: "",
  });

  const [errors, setErrors] = useState({
    lessonId: "",
    lessonName: "",
    lessonDescription: "",
    programId: "",
    courseId: "",
    common: "",
  });

  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
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

    fetchPrograms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleProgramChange = async (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    try {
      const response = await axios.get(`${SERVER_URL}/api/courses/programCode/${value}`);
      console.log(response.data);
      if(Array.isArray(response.data)){
        setCourses(response.data);
      } else if(response.data && typeof response.data === 'object'){
        setCourses([response.data]);
      } else {
        setCourses([]);
      }
      
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
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
      const response = await fetch(`${SERVER_URL}/api/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lesson_id: form.lessonId,
          lesson_name: form.lessonName,
          lesson_description: form.lessonDescription,
          program_id: form.programId,
          course_id: form.courseId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, lessonId: data.error }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.message }));
        }
      } else {
        handleClose();
        refreshLessons();
      }
    } catch (error) {
      setErrors({ common: "Registration failed. Please try again." });
    }
  };

  const handleClear = () => {
    setForm({
      lessonId: "",
      lessonName: "",
      lessonDescription: "",
      programId: "",
      courseId: "",
    });
    setErrors({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Create New Lesson</Typography>
          <Button variant="outlined" onClick={handleClose}>
            Back to Lesson Page
          </Button>
        </Box>
        <Form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" mb={2}>
                  Lesson Information
                </Typography>
                <TextField
                  fullWidth
                  label="Lesson ID"
                  name="lessonId"
                  value={form.lessonId}
                  onChange={handleChange}
                  error={!!errors.lessonId}
                  helperText={errors.lessonId}
                />
                <TextField
                  fullWidth
                  label="Lesson Name"
                  name="lessonName"
                  value={form.lessonName}
                  onChange={handleChange}
                  error={!!errors.lessonName}
                  helperText={errors.lessonName}
                />
                <FormControl fullWidth margin="normal" error={!!errors.programId}>
                  <InputLabel id="program-label">Program</InputLabel>
                  <Select
                    labelId="program-label"
                    id="programId"
                    name="programId"
                    value={form.programId}
                    onChange={handleProgramChange}
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
                <FormControl fullWidth margin="normal" error={!!errors.courseId}>
                  <InputLabel id="course-label">Course</InputLabel>
                  <Select
                    labelId="course-label"
                    id="courseId"
                    name="courseId"
                    value={form.courseId}
                    onChange={handleChange}
                    label="Course"
                  >
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <MenuItem key={course.course_id} value={course.course_id}>
                          {course.course_title}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        No courses under the selected program
                      </MenuItem>
                    )}
                  </Select>
                  {errors.courseId && (
                    <FormHelperText>{errors.courseId}</FormHelperText>
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
                  Lesson Description
                </Typography>
                <TextField
                  fullWidth
                  label="Lesson Description"
                  name="lessonDescription"
                  value={form.lessonDescription}
                  onChange={handleChange}
                  error={!!errors.lessonDescription}
                  helperText={errors.lessonDescription}
                  multiline
                  rows={4}
                />
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create New Lesson
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

CreateLessonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refreshLessons: PropTypes.func.isRequired,
};

export default CreateLessonModal;

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
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
