import Joi from 'joi';
// import Course from '../models/CourseModel.js';
import User from '../models/userModel.js';
import Enrollment from '../models/EnrollmentModel.js';
import Assignment from '../models/AssignmentModel.js';
import Lesson from '../models/LessonModel.js';
import Course from '../models/CourseModel.js';


// Define the validation schema for a course
const courseSchema = Joi.object({
    course_name: Joi.string().min(3).required(),
    course_code: Joi.string().trim().required(),
    course_description: Joi.string().trim().required(),
    instructor_id: Joi.number().integer().required()
});

// CREATE a new course
export const createCourse = async (req, res) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
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
        const courses = await Course.findAll({
            include: {
                model: User,
                as: 'Instructor',
                attributes: ['first_name', 'last_name', 'profile_pic'],
            }
        });
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
};

// READ a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({
            where: { id: req.params.id },
            include: [{
                model: User,
                as: 'Instructor',
                attributes: ['first_name', 'last_name', 'profile_pic'],
            }],
        });
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }

        const assignments = await Assignment.findAll({
            where: {
                course_id: course.get('id')
            }
        });

        const lessons = await Lesson.findAll({
            where: { course_id: course.get('id') }
        });

        return res.send({
            course,
            assignments,
            lessons,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE a course by ID
export const updateCourse = async (req, res) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
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

export const createEnrollment = async (req, res) => {
    try {
        const userId = req.user.id;
        const course_id = +(req.params.id || 0);

        // check if user is already enrolled
        const existingEnrollment = await Enrollment.findOne({
            where: {
                student_id: userId,
                course_id: course_id,
            },
        });

        if (existingEnrollment) {
            return res.status(400).json({
                error: 'You are already enrolled in this course!',
            });
        }

        const enrollment = await Enrollment.create({
            course_id: course_id,
            student_id: userId,
            enrollment_date: new Date(),
        });

        return res.status(201).json(enrollment);
    } catch (error) {
        console.error('Error creating enrollment:', error);
        res.status(500).json({
            error: 'Error creating enrollment: ' + error.message,
        });
    }
};