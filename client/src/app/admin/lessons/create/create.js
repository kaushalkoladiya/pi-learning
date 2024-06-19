import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

const CreateLessonPage = () => {
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form fields
    if (!lessonName || !lessonDescription || !lessonContent || !courseId) {
      alert("Please fill in all fields");
      return;
    }

    //   object to send to the server
    const formData = {
      lesson_name: lessonName,
      lesson_description: lessonDescription,
      lesson_content: lessonContent, // (JSON). collaborate with sukhmeet
      course_id: parseInt(courseId),
    };

    try {
      const response = await axios.post("/api/lessons", formData); // path for API here

      console.log("Lesson created:", response.data);

      setLessonName("");
      setLessonDescription("");
      setLessonContent("");
      setCourseId("");
      alert("Lesson created successfully!");
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert("Failed to create lesson. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Create Lesson</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Lesson Name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Lesson Description"
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          label="Lesson Content"
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
          multiline
          rows={6}
          required
        />
        <FormControl fullWidth required>
          <InputLabel id="courseId">Course ID</InputLabel>
          <Select
            labelId="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <MenuItem value={1}>Course 1</MenuItem>
         // <MenuItem value={2}>Course 2</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Create Lesson
        </Button>
      </form>
    </Box>
  );
};

export default CreateLessonPage;
