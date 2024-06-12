import express from 'express';
import Course from '../models/CourseModel.js'; // Update the path as per your structure

const courseRouter = express.Router();

// CREATE a new course
courseRouter.post('/courses', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all courses
courseRouter.get('/courses', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
});

// READ course by ID
courseRouter.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }
        res.send(course);
    } catch (error) {
        res.status(500).send(error);
    }
});


export default courseRouter;