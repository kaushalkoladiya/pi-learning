'use client';

import { getCourseById } from '@/api';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CardHeader, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import BackButton from '@/components/BackButton';

const CourseDetails = () => {
  const params = useParams();

  const [courseDetails, setCourseDetails] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      if (!params.id) {
        return;
      }

      const { data } = await getCourseById(params.id);
      setCourseDetails(data.course);
      setLessons(data.lessons);
      setAssignments(data.assignments);
    })()
  }, [params.id])

  return (
    <Box p={6}>
      <BackButton />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">{courseDetails?.course_name}</Typography>
          <Typography variant="body1">{courseDetails?.course_code}</Typography>
          <Typography variant="body2">{courseDetails?.course_description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Lessons</Typography>
          {assignments.length === 0 && <Typography>No assignments</Typography>}
          {lessons.map(lesson => (
            <Accordion key={`lesson-${lesson.id}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                {lesson.lesson_name}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {lesson.lesson_description}
                </Typography>
                <Typography>
                  {lesson.lesson_content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Assignments</Typography>
          {assignments.length === 0 && <Typography>No assignments</Typography>}

          {assignments.map(assignment => (
            <Accordion key={`ass-${assignment.id}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {assignment.assignment_name}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {assignment.assignment_description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Instructor</Typography>

          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                R
              </Avatar>
            }
            title={`${courseDetails?.Instructor?.first_name} ${courseDetails?.Instructor?.last_name}`}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseDetails