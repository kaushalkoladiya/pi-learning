import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import StudentList from './StudentList';
import AssignmentList from './AssignmentList';
import LessonList from './LessonList';
import { getCoursesByInstructor } from '@/api/instructor';
import CourseDetails from './CourseDetails';
import PublishedAssignments from './PublishedAssignments';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await getCoursesByInstructor();
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId)
    setCourseDetails(courses.find(course => course.course_id === courseId));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Instructor Dashboard
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Select Course</InputLabel>
        <Select
          value={selectedCourse}
          onChange={(e) => handleCourseChange(e.target.value)}
          label="Select Course"
        >
          {courses.map((course) => (
            <MenuItem key={course.course_id} value={course.course_id}>
              {course.course_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCourse && courseDetails && (
        <Box my={2}>
          <CourseDetails course={courseDetails} />
          <Paper elevation={3} sx={{ mb: 2, padding: '16px' }}>
            <StudentList courseId={selectedCourse} />
          </Paper>
          <Paper elevation={3} sx={{ mb: 2, padding: '16px' }}>
            <PublishedAssignments courseId={selectedCourse} />
          </Paper>
          <Paper elevation={3} sx={{ mb: 2, padding: '16px' }}>
            <LessonList courseId={selectedCourse} />
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default InstructorDashboard;
