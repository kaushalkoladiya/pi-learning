import React, { useState } from "react";
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

const LessonFilesModal = ({ open, handleClose, lessonId, refreshFiles }) => {
  const [form, setForm] = useState({
    lessonId: lessonId || "",
    fileName: "",
    filePic: null,
    filePicName: "",
  });

  const [errors, setErrors] = useState({
    lessonId: "",
    fileName: "",
    common: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
        fileUrl: fileURL,
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

    try {
      const response = await fetch(`${SERVER_URL}/api/lessonFiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lesson_id: form.lessonId,
          file_name: form.fileName,
          file_url: form.fileUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.error }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.message }));
        }
      } else {
        handleClose();
        refreshFiles();
      }
    } catch (error) {
      setErrors({ common: "Failed to upload the file. Please try again." });
    }
  };

  const handleClear = () => {
    setForm({
      lessonId: lessonId || "",
      fileName: "",
      filePic: null,
      filePicName: "",
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
          <Typography variant="h5">Upload Lesson File</Typography>
          <Button variant="outlined" onClick={handleClose}>
            Back to Lessons
          </Button>
        </Box>
        <Form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}
          <TextField
            fullWidth
            label="Lesson ID"
            name="lessonId"
            value={form.lessonId}
            onChange={handleChange}
            error={!!errors.lessonId}
            helperText={errors.lessonId}
            InputProps={{
              readOnly: true,
            }}
            sx={{ backgroundColor: "#f0f0f0", mb: 2 }}
          />
          <TextField
            fullWidth
            label="File Name"
            name="fileName"
            value={form.fileName}
            onChange={handleChange}
            error={!!errors.fileName}
            helperText={errors.fileName}
            sx={{ mb: 2 }}
          />
          <Box mt={2}>
            <input
              accept="*/*"
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
              sx={{ ml: "74%" }}
            >
              Upload
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
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

LessonFilesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  lessonId: PropTypes.string.isRequired,
  refreshFiles: PropTypes.func.isRequired,
};

export default LessonFilesModal;

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px; /* Adjusted width */
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
