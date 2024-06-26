import bcrypt from 'bcrypt';
import Joi from 'joi';
import User from '../models/userModel.js';

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Joi validation schema for Instructor
const instructorSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

// Joi validation schema for Instructor
const updateInstructorSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

// CREATE a new instructor
export const createInstructor = async (req, res) => {
  const { error } = instructorSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {

    // encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const instructor = await User.create({
      ...req.body,
      user_type: 'instructor',
      password: hashedPassword
    });
    res.status(201).json(instructor);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// READ all instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.findAll(
      {
        where: { user_type: 'instructor' },
        attributes: { exclude: ['password'] }
      }
    );
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching instructors: " + error.message });
  }
};

// READ a single instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    const instructor = await User.findByPk(req.params.id);
    if (!instructor || instructor.user_type !== 'instructor') {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE an instructor by ID
export const updateInstructor = async (req, res) => {
  const { error } = updateInstructorSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const instructor = await User.findByPk(req.params.id);
    if (!instructor || instructor.user_type !== 'instructor') {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    await instructor.update(req.body);
    res.json(instructor);
  } catch (error) {
    res.status(400).json(error);
  }
};

// DELETE an instructor by ID
export const deleteInstructor = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id, user_type: 'instructor' }
    });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.status(204).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Cannot delete instructor, make sure the instructor is not teaching any course!"});
  }
};

export { getProfile };
