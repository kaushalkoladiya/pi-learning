import { SERVER_URL } from '@/constants/routes';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'

const InstructorsDropdown = ({ selectedInstructor, onChange, errorMessage }) => {
  const [instructorsData, setInstructorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/api/instructors`);

      const data = await response.json();
      setInstructorsData(data);
    };

    fetchData();
  }, []);

  return (
    <FormControl fullWidth error={errorMessage}>
      <InputLabel id="instructor">Instructor</InputLabel>
      <Select
        labelId="instructor"
        value={selectedInstructor}
        label="Instructor"
        onChange={(e) => onChange(e.target.value)}
      >
        {instructorsData.map(instructor => (
          <MenuItem key={instructor.id} value={instructor.id}>
            {instructor.first_name} {instructor.last_name}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>Select an instructor</FormHelperText>}
    </FormControl>
  )
}

export default InstructorsDropdown