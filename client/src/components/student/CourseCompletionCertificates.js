import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Card, CardContent } from '@mui/material';

const CourseCompletionCertificates = ({ certificates = [] }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Course Completion Certificates:</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="certificate table">
            <TableHead>
              <TableRow>
                <TableCell>Certificate Name</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>{certificate.name}</TableCell>
                  <TableCell>{certificate.course_name}</TableCell>
                  <TableCell>{new Date(certificate.issue_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" href={certificate.url} target="_blank">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CourseCompletionCertificates;
