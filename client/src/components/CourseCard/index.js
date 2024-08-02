import * as React from 'react';
import swal from 'sweetalert';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Avatar, Grid, Box } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { enrollInCourse } from '@/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { styled } from '@mui/material/styles';

const HeroCard = styled(Card)(({ theme }) => ({
  height: '400px',
  position: 'relative',
  '& .MuiCardContent-root': {
    position: 'absolute',
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    width: '100%',
  },
  '& .MuiCardMedia-root': {
    height: '100%',
  },
}));

const RegularCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  '& .MuiCardMedia-root': {
    height: 'auto',
  },
  '& .MuiCardContent-root': {
    flexGrow: 1,
  },
}));

export default function CourseCard({ course, isHero }) {
  const { isAuth } = useAuth();
  const router = useRouter();

  const handleEnroll = async () => {
    if (!isAuth) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    try {
      const data = await enrollInCourse(course.course_id);

      console.log(data);

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
      console.log(error)
      swal({
        title: 'Error',
        text: error?.response?.data?.error || 'Error enrolling course',
        icon: 'error'
      });
    }
  };

  return isHero ? (
    <HeroCard>
      <CardMedia
        component="img"
        image={course?.profile_pic || "https://placehold.co/600x400"}
        alt={course?.course_title}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {course?.course_title}
        </Typography>
        <Typography variant="body2">
          {course?.short_description}
        </Typography>
        <Grid container alignItems="center" spacing={2} mt={2}>
          <Grid item>
            <Avatar alt={course.Instructor?.first_name} src={course.Instructor?.profile_pic} />
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {course.Instructor?.first_name} {course.Instructor?.last_name}
            </Typography>
          </Grid>
        </Grid>
        <Button color="primary" variant='contained' onClick={handleEnroll} sx={{ mt: 2 }}>
          Enroll
        </Button>
      </CardContent>
    </HeroCard>
  ) : (
    <RegularCard>
      <CardActionArea>
        <CardMedia
          component="img"
          image={course?.profile_pic || "https://placehold.co/600x400"}
          alt={course?.course_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course?.course_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course?.short_description}
          </Typography>
          <Grid container alignItems="center" spacing={2} mt={2}>
            <Grid item>
              <Avatar alt={course.Instructor?.first_name} src={course.Instructor?.profile_pic} />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {course.Instructor?.first_name} {course.Instructor?.last_name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button color="primary" variant='contained' onClick={handleEnroll}>
            Enroll
          </Button>
        </CardActions>
      </CardActionArea>
    </RegularCard>
  );
}
