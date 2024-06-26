import express from 'express';
import {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson
} from '../controllers/lessonController.js';

const lessonRouter = express.Router();

lessonRouter.post('/', createLesson);
lessonRouter.get('/', getAllLessons);
lessonRouter.get('/:id', getLessonById);
lessonRouter.put('/:id', updateLesson);
lessonRouter.delete('/:id', deleteLesson);

export default lessonRouter;
