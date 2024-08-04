import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Card, CardContent } from '@mui/material';
import { fetchCertificates } from '@/api/student';
import DownloadCertificate from '../Certificate/DownloadCertificate';

const CourseCompletionCertificates = ({ user: student }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const certificatesData = await fetchCertificates();
        setCertificates(certificatesData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                  <TableCell>{certificate.Certificate.name}</TableCell>
                  <TableCell>{certificate.Certificate.course.course_title}</TableCell>
                  <TableCell>{new Date(certificate.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DownloadCertificate
                      studentName={`${student.first_name} ${student.last_name}`}
                      courseName={certificate.Certificate.course.course_title}
                      issueDate={new Date(certificate.issueDate).toLocaleDateString()}
                      instructor={
                        certificate.Certificate.course.Instructor.first_name + " " + certificate.Certificate.course.Instructor.last_name
                        || 'Pi Instructor'
                      }
                    />
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
