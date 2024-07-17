import * as React from 'react';
import swal from 'sweetalert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { enrollCourse } from '@/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';


export default function CourseCard({ course }) {
  const { isAuth } = useAuth();
  const router = useRouter();

  const handleEnroll = async () => {
    if (!isAuth) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    try {
      const data = await enrollCourse(course.id);
      if (data.status === 201) {
        swal({
          title: 'Success',
          text: 'Enrolled successfully!',
          icon: 'success'
        });
      } else {
        swal({
          title: 'Error',
          text: 'Error enrolling course',
          icon: 'error'
        });
      }
    } catch (error) {
      swal({
        title: 'Error',
        text: error?.response?.data?.error || 'Error enrolling course',
        icon: 'error'
      });
    }
  };


  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={course?.course_image || "https://placehold.co/600x400"}
          alt={course?.course_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course?.course_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course?.course_description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant='contained' onClick={handleEnroll}>
            Enroll
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
