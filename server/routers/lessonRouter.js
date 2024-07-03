import express from 'express';
import {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson
} from '../controllers/lessonController.js';

const lessonRouter = express.Router();

lessonRouter.post('/', createLesson); // POST /api/lessons to create a lesson
lessonRouter.get('/', getAllLessons); // GET /api/lessons to get all lessons
lessonRouter.get('/:id', getLessonById); // GET /api/lessons/:id to get a lesson by id
lessonRouter.put('/:id', updateLesson); // PUT /api/lessons/:id to update a lesson by id
lessonRouter.delete('/:id', deleteLesson); // DELETE /api/lessons/:id to delete a lesson by id

export default lessonRouter;
