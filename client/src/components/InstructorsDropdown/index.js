import { SERVER_URL } from '@/constants/routes';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'

const InstructorsDropdown = ({ selectedInstructor, onChange }) => {
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
    <FormControl fullWidth>
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
    </FormControl>
  )
}

export default InstructorsDropdown