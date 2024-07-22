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
  IconButton,
  Snackbar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import axios from "axios";
import PropTypes from "prop-types";

const CreateAssignmentModal = ({ open, handleClose, refreshAssignments }) => {
  const [form, setForm] = useState({
    courseId: "",
    lessonId: "",
    assignmentName: "",
    filePic: null,
    filePicName: "",
    assignmentUrl: "",
    dueDate: "",
  });

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [errors, setErrors] = useState({
    courseId: "",
    lessonId: "",
    assignmentName: "",
    assignmentUrl: "",
    dueDate: "",
    common: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/lessons/course/${courseId}`);
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === "courseId") {
      const selectedCourse = courses.find(course => course.course_id === value);
      setForm({
        ...form,
        courseId: value,
        courseName: selectedCourse ? selectedCourse.course_title : "",
        lessonId: "",
      });
      fetchLessons(value);
    }
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      filePic: e.target.files[0],
      filePicName: e.target.files[0].name,
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", form.filePic);

    try {
      const response = await axios.post(`${SERVER_URL}/api/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const fileURL = 'https://pilearningcapstone.blob.core.windows.net/pi-learning/' + response.data[0].blobName;
      setForm((prevForm) => ({
        ...prevForm,
        assignmentUrl: fileURL,
      }));
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error uploading file:", error);
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

    try {
      const response = await fetch(`${SERVER_URL}/api/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_name: form.assignmentName,
          assignment_url: form.assignmentUrl,
          due_date: form.dueDate,
          lesson_id: form.lessonId,
          course_id: form.courseId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.error }));
        }
      } else {
        handleClose();
        refreshAssignments();
      }
    } catch (error) {
      setErrors({ common: "Failed to create assignment. Please try again." });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" mb={2}>
          Create New Assignment
        </Typography>
        <form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="courseId"
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              label="Course"
              error={!!errors.courseId}
            >
              {courses.map((course) => (
                <MenuItem key={course.course_id} value={course.course_id}>
                  {course.course_title}
                </MenuItem>
              ))}
            </Select>
            {errors.courseId && (
              <Alert severity="error">{errors.courseId}</Alert>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="lesson-label">Lesson</InputLabel>
            <Select
              labelId="lesson-label"
              id="lessonId"
              name="lessonId"
              value={form.lessonId}
              onChange={handleChange}
              label="Lesson"
              error={!!errors.lessonId}
            >
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <MenuItem key={lesson.lesson_id} value={lesson.lesson_id}>
                    {lesson.lesson_name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  Selected course has no lessons
                </MenuItem>
              )}
            </Select>
            {errors.lessonId && (
              <Alert severity="error">{errors.lessonId}</Alert>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="Assignment Name"
            name="assignmentName"
            value={form.assignmentName}
            onChange={handleChange}
            error={!!errors.assignmentName}
            helperText={errors.assignmentName}
            sx={{ mb: 2 }}
          />
          <Box mt={2} mb={2}>
            <input
              accept="*/*"
              style={{ display: "none" }}
              id="assignment-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="assignment-file">
              <IconButton
                color="primary"
                aria-label="upload file"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {form.filePicName && (
              <Typography
                variant="body1"
                style={{ display: "inline", marginLeft: 10 }}
              >
                {form.filePicName}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              sx={{ ml: "72%" }}
            >
              Upload
            </Button>
          </Box>
          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="datetime-local"
            value={form.dueDate}
            onChange={handleChange}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create
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

CreateAssignmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refreshAssignments: PropTypes.func.isRequired,
};

export default CreateAssignmentModal;
