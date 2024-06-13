import Joi from 'joi';
import Course from '../models/CourseModel.js'; 

// Define the validation schema for a course
const courseSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    courseCode: Joi.string().required(),
    stripeProductId: Joi.string().allow(''), // Optional fields
    stripePriceId: Joi.string().allow(''),   // Optional fields
    instructorId: Joi.number().integer()     // Optional fields
});

// CREATE a new course
export const createCourse = async (req, res) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const course = await Course.create(req.body);
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

// READ all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
};

// READ a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }
        res.send(course);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE a course by ID
export const updateCourse = async (req, res) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updated = await Course.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] === 0) {
            return res.status(404).send({ error: 'Course not found' });
        }
        const updatedCourse = await Course.findByPk(req.params.id);
        res.send(updatedCourse);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE a course by ID
export const deleteCourse = async (req, res) => {
    try {
        const deleted = await Course.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).send({ error: 'Course not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};
