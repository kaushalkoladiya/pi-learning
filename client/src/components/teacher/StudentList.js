// components/teacher/StudentList.js
import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { getStudentsByCourse } from '@/api/instructor';

const StudentList = ({ courseId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => {
      const studentsResponse = await getStudentsByCourse(courseId);
      setStudents(studentsResponse.data);
    })();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Students
      </Typography>
      <List>
        {students.length > 0 ? (
          students.map((student) => (
            <ListItem key={student.id}>
              <ListItemText primary={`${student.first_name} ${student.last_name}`} secondary={student.email} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No students enrolled in this course.</Typography>
        )}
      </List>
    </div>
  );
};

export default StudentList;
