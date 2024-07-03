import { SERVER_URL } from '@/constants/routes';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'

const CoursesDropdown = ({ selectedCourse, onChange, errorMessage }) => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/courses`);

      const data = await response.json();
      setCoursesData(data);
    };

    fetchData();
  }, []);

  return (
    <FormControl fullWidth error={errorMessage}>
      <InputLabel id="course">Course</InputLabel>
      <Select
        labelId="course"
        value={selectedCourse}
        label="Course"
        onChange={(e) => onChange(e.target.value)}
      >
        {coursesData.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.course_name}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>Select a course</FormHelperText>}
    </FormControl>
  )
}

export default CoursesDropdown