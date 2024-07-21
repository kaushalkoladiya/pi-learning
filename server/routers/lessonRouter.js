import express from 'express';
import {
    createLesson,
    getAllLessons,
    getLessonById,
    deleteLesson,
    fetchFilesByLessonId,
    deleteFilesByLessonId
} from '../controllers/lessonController.js';

const lessonRouter = express.Router();

lessonRouter.post('/', createLesson); 
lessonRouter.get('/', getAllLessons); 
lessonRouter.get('/:id', getLessonById);  
lessonRouter.delete('/:id', deleteLesson);
lessonRouter.get('/:id/files', fetchFilesByLessonId)
lessonRouter.delete('/:id/files/:id', deleteFilesByLessonId)
export default lessonRouter;
