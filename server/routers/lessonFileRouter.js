import express from 'express';
import {
    createLessonFile,
} from '../controllers/lessonFileController.js';

const lessonFileRouter = express.Router();

lessonFileRouter.post('/', createLessonFile); 

export default lessonFileRouter;