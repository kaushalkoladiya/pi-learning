import express from 'express';
import User from '../models/userModel.js';
import { 
  getProfile, 
  createInstructor, 
  getAllInstructors, 
  getInstructorById, 
  updateInstructor, 
  deleteInstructor,
  updateProfile,
  getCountries,
  getDepartments,
  getProvinces
} from '../controllers/UserController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const userRouter = express.Router();

userRouter.get('/profile', authenticate, getProfile);
userRouter.put('/profile', authenticate, updateProfile);

userRouter.get('/', async (req, res) => {
  console.log('Request received');

  const users = await User.findAll();

  console.log(users);

  res.send(users);
});

// routes only for usertype- instructor
userRouter.post('/instructors', createInstructor);
userRouter.get('/instructors', getAllInstructors);
userRouter.get('/instructors/:id', getInstructorById);
userRouter.put('/instructors/:id', updateInstructor);
userRouter.delete('/instructors/:id', deleteInstructor);

// metadata routes
userRouter.get('/countries', getCountries);
userRouter.get('/departments', getDepartments);
userRouter.get('/provinces', getProvinces);

export default userRouter;
