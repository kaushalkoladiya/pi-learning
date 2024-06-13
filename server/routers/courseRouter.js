import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../controllers/courseController.js'; 
const courseRouter = express.Router();

courseRouter.post('/courses', createCourse);
courseRouter.get('/courses', getAllCourses);
courseRouter.get('/courses/:id', getCourseById);
courseRouter.put('/courses/:id', updateCourse);
courseRouter.delete('/courses/:id', deleteCourse);

export default courseRouter;
