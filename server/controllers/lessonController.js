import Lesson from '../models/LessonModel.js'; // Update the path to match your structure
import  Course  from '../models/CourseModel.js'; // Import Course model for relational operations
import Joi from 'joi';

// Joi validation schema for Lesson
const lessonSchema = Joi.object({
    lesson_name: Joi.string().required(),
    lesson_description: Joi.string().allow(''),
    lesson_content: Joi.string().allow(''),
    course_id: Joi.number().integer().required()
});

const updateLessonSchema = Joi.object({
    lesson_name: Joi.string().required(),
    lesson_description: Joi.string().allow(''),
    lesson_content: Joi.string().allow(''),
});

export const createLesson = async (req, res) => {
    const { error } = lessonSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Ensure the course exists before creating a lesson
    const course = await Course.findByPk(req.body.course_id);
    if (!course) {
        return res.status(404).send({ error: 'Course not found' });
    }

    try {
        const lesson = await Lesson.create(req.body);
        res.status(201).send(lesson);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll({
            include: [{ model: Course }]  // Include Course details in the response
        });
        res.json(lessons);
    } catch (error) {
        res.status(500).send({ error: "Error fetching lessons: " + error.message });
    }
};

export const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id, {
            include: [{ model: Course }]  // Include Course details in the response
        });
        if (!lesson) {
            return res.status(404).send({ error: 'Lesson not found' });
        }
        res.send(lesson);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateLesson = async (req, res) => {
    const { error } = updateLessonSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Optionally ensure course ID exists if updated
    if (req.body.courseId) {
        const course = await Course.findByPk(req.body.course_id);
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }
    }

    try {
        const updated = await Lesson.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] === 0) {
            return res.status(404).send({ error: 'Lesson not found' });
        }
        const updatedLesson = await Lesson.findByPk(req.params.id, {
            include: [{ model: Course }]
        });
        res.send(updatedLesson);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteLesson = async (req, res) => {
    try {
        const deleted = await Lesson.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).send({ error: 'Lesson not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};
