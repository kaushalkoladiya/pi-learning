import express from 'express';
import {
    createProgram, getAllPrograms, getProgramByID, updateProgram, deleteProgram
} from '../controllers/ProgramController.js'; 
const programRouter = express.Router();


programRouter.post('/', createProgram);
programRouter.get('/', getAllPrograms);
programRouter.get('/:id', getProgramByID);
programRouter.put('/:id', updateProgram);
programRouter.delete('/:id', deleteProgram);

export default programRouter;