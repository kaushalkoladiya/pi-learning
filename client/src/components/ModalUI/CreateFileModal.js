import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { SERVER_URL } from "@/constants/routes";
import { validateField } from "@/utils/validation";
import axios from "axios";
import swal from "sweetalert";

const LessonFilesModal = ({ open, handleClose, lessonId, refreshFiles }) => {
  const [form, setForm] = useState({
    lessonId: lessonId || "",
    fileName: "",
    fileUrl: null,
    fileUrlName: "",
    fileUrl: "",
  });

  const [errors, setErrors] = useState({
    lessonId: "",
    fileName: "",
    fileUrl: "",
    common: "",
  });

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
      fileUrl: e.target.files[0],
      fileUrlName: e.target.files[0].name,
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
      const fileURL =
        "https://pilearningcapstone.blob.core.windows.net/pi-learning/" +
        response.data[0].blobName;
      setForm((prevForm) => ({
        ...prevForm,
        fileUrl: fileURL,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileUrl: "",
      }));
      swal("Success", "File uploaded successfully!", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      swal("Error", "Failed to upload file. Please try again.", "error");
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
          swal("Error", data.error, "error");
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, common: data.message }));
          swal("Error", data.message, "error");
        }
      } else {
        handleClose();
        refreshFiles();
        swal("Success", "File added to lesson successfully!", "success");
      }
    } catch (error) {
      setErrors({ common: "Failed to upload the file. Please try again." });
      swal("Error", "Failed to upload the file. Please try again.", "error");
    }
  };

  const handleClear = () => {
    setForm({
      lessonId: lessonId || "",
      fileName: "",
      fileUrl: null,
      fileUrlName: "",
      fileUrl: "",
    });
    setErrors({});
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
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
          <Typography variant="h6" mb={1}>
            File Upload
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <input
              accept="*/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Choose File
              </Button>
            </label>
            {form.fileUrlName && (
              <Typography
                variant="body1"
                style={{ marginLeft: 10, flexGrow: 1 }}
              >
                {form.fileUrlName}
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Box>
          {errors.fileUrl && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.fileUrl}
            </Alert>
          )}
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
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
  width: 60%;
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
