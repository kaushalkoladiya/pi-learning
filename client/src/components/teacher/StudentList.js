// components/teacher/StudentList.js
import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { getStudentsByCourse, issueCertificate } from '@/api/instructor';

const StudentList = ({ courseId, course }) => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const studentsResponse = await getStudentsByCourse(courseId);
        setStudents(studentsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    })();
  }, []);

  const handleOpenDialog = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleIssueCertificate = async () => {
    try {
      const data = await issueCertificate(courseId, selectedStudent.id);

      swal({
        title: "Success!",
        text: "Certificate issued successfully.",
        icon: "success",
      });
      handleCloseDialog();
    } catch (error) {
      swal({
        title: "Error!",
        text: error?.response?.data?.error || "An error occurred while issuing the certificate.",
        icon: "error",
      });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Students
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="student table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.first_name} {student.last_name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(student)}
                  >
                    Issue Certificate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Issue Certificate Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Issue Certificate</DialogTitle>
        <DialogContent>
          <Typography variant='body2'>
            Are you sure you want to issue the certificate for
            <span>{' "'}{selectedStudent?.first_name} {selectedStudent?.last_name}{'" '}</span>
            for the course 
            <span>{' "'}{course?.course_title}{'"'}</span>
            ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleIssueCertificate} color="primary" variant="contained">Issue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentList;
