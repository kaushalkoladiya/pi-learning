import express from 'express';
import authenticateToken from '../middleware/AuthMiddleware.js';
import { checkEnrollment, enrollInCourse, getCourseDetails, getCourseLessons, getStudentCourses, getStudentDashboard } from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.get('/dashboard', authenticateToken, getStudentDashboard);
studentRouter.get('/courses', authenticateToken, getStudentCourses);
studentRouter.get('/courses/:courseId', getCourseDetails);
studentRouter.get('/courses/:courseId/lessons', getCourseLessons);
studentRouter.get('/courses/:courseId/enrollment', authenticateToken, checkEnrollment);
studentRouter.post('/courses/:courseId/enroll', authenticateToken, enrollInCourse);


export default studentRouter;