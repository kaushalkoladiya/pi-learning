import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    createEnrollment
} from '../controllers/CourseController.js'; 
import authenticateToken from '../middleware/AuthMiddleware.js';
const courseRouter = express.Router();

courseRouter.post('/', createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', updateCourse);
courseRouter.delete('/:id', deleteCourse);
courseRouter.post('/:id/enroll', authenticateToken, createEnrollment)

export default courseRouter;
