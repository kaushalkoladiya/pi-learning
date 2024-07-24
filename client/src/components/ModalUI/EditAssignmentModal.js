import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
  IconButton,
  Snackbar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import axios from "axios";

const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditAssignmentModal = ({
  open,
  handleClose,
  assignment,
  refreshAssignments,
}) => {
  const [form, setForm] = useState({
    lessonName: assignment.lessonName || "",
    assignmentId: assignment.assignment_id || "",
    assignmentName: assignment.assignment_name || "",
    assignmentUrl: assignment.assignment_url || "",
    dueDate: assignment.due_date || "",
  });

  const [errors, setErrors] = useState({
    dueDate: "",
    filePic: "",
    common: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (assignment?.lesson_id) {
      fetchLessonName(assignment.lesson_id);
    }
    setForm({
      lessonName: assignment.lessonName || "",
      assignmentId: assignment.assignment_id || "",
      assignmentName: assignment.assignment_name || "",
      assignmentUrl: assignment.assignment_url || "",
      dueDate: assignment.due_date || "",
    });
  }, [assignment]);

  const fetchLessonName = async (lessonId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/lessons/${lessonId}`);
      const data = await response.json();
      setForm((prevForm) => ({
        ...prevForm,
        lessonName: data.lesson_name,
      }));
    } catch (err) {
      console.error("Failed to fetch lesson name", err);
    }
  };

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
      const response = await fetch(
        `${SERVER_URL}/api/assignments/${form.assignmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assignment_id: form.assignmentId,
            assignment_name: form.assignmentName,
            assignment_url: form.assignmentUrl,
            due_date: form.dueDate,
            lesson_id: assignment.lesson_id, // assuming lesson_id is static and coming from the assignment prop
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setErrors({ common: data.message || "Failed to update assignment" });
      } else {
        handleClose();
        refreshAssignments();
      }
    } catch (error) {
      setErrors({ common: "Failed to update assignment. Please try again." });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Typography variant="h5" mb={2}>
          Edit Assignment
        </Typography>
        <form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <TextField
            fullWidth
            label="Lesson Name"
            name="lessonName"
            value={form.lessonName}
            onChange={handleChange}
            error={!!errors.lessonName}
            helperText={errors.lessonName}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f0f0f0" },
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Assignment ID"
            name="assignmentId"
            value={form.assignmentId}
            onChange={handleChange}
            error={!!errors.assignmentId}
            helperText={errors.assignmentId}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f0f0f0" },
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Assignment Name"
            name="assignmentName"
            value={form.assignmentName}
            onChange={handleChange}
            error={!!errors.assignmentName}
            helperText={errors.assignmentName}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f0f0f0" },
            }}
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
            value={form.dueDate ? formatDateForInput(form.dueDate): ' '}
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
              Update
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            File Uploaded Successfully
          </Alert>
        </Snackbar>
      </ModalBox>
    </Modal>
  );
};

EditAssignmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  assignment: PropTypes.object.isRequired,
  refreshAssignments: PropTypes.func.isRequired,
};

export default EditAssignmentModal;

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: white;
  box-shadow: 24;
  padding: 16px;
  border-radius: 8px;
`;
