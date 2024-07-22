import express from 'express';
import {
    createLesson,
    getAllLessons,
    getLessonById,
    getLessonByCourseId,
    deleteLesson,
    fetchFilesByLessonId,
    deleteFilesByLessonId
} from '../controllers/lessonController.js';

const lessonRouter = express.Router();

lessonRouter.post('/', createLesson); 
lessonRouter.get('/', getAllLessons); 
lessonRouter.get('/:id', getLessonById);
lessonRouter.get('/course/:id',getLessonByCourseId)  
lessonRouter.delete('/:id', deleteLesson);
lessonRouter.get('/:id/files', fetchFilesByLessonId)
lessonRouter.delete('/:id/files/:id', deleteFilesByLessonId)
export default lessonRouter;
