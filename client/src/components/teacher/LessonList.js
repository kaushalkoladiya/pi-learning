import React, { useEffect, useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLessonsByCourse } from '@/api/instructor';

const LessonList = ({ courseId }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      const lessonsResponse = await getLessonsByCourse(courseId);
      
      setLessons(lessonsResponse.data);
    })();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Lessons
      </Typography>
      {lessons.length > 0 ? (
        lessons.map((lesson) => (
          <Accordion key={lesson.lesson_id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{lesson.lesson_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="body2" color="text.secondary">
                  {lesson.lesson_description}
                </Typography>
                {lesson.LessonFiles && lesson.LessonFiles.length > 0 && (
                  <List>
                    {lesson.LessonFiles.map((file) => (
                      <ListItem key={file.file_id}>
                        <ListItemText
                          primary={file.file_name}
                          secondary={
                            <Button
                              variant="contained"
                              color="primary"
                              href={file.file_url}
                              target="_blank"
                            >
                              Download
                            </Button>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2">No lessons available for this course.</Typography>
      )}
    </div>
  );
};

export default LessonList;
