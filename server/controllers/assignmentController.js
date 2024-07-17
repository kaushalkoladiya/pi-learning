import Joi from 'joi';
import Assignment from '../models/AssignmentModel.js';
import Course from '../models/CourseModel.js'; // Import Course model for relational operations
import Enrollment from '../models/EnrollmentModel.js';
import AssignmentSubmission from '../models/AssignmentSubmissionModel.js';

// Joi validation schema for Assignment
const assignmentSchema = Joi.object({
    assignment_name: Joi.string().trim().required(),
    assignment_description: Joi.string().trim().required(),
    due_date: Joi.date().required(),
    course_id: Joi.number().integer().required()
});

// CREATE a new assignment
export const createAssignment = async (req, res) => {
    const { error } = assignmentSchema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    // Ensure the course exists before creating an assignment
    const course = await Course.findByPk(req.body.course_id);
    if (!course) {
        return res.status(404).send({ error: 'Course not found' });
    }

    try {
        const assignment = await Assignment.create(req.body);
        res.status(201).send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// READ all assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.findAll({
            include: [{ model: Course }] 
        });
        res.json(assignments);
    } catch (error) {
        res.status(500).send({ error: "Error fetching assignments: " + error.message });
    }
};

// READ a single assignment by ID
export const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findByPk(req.params.id, {
            include: [{ model: Course }] 
        });
        if (!assignment) {
            return res.status(404).send({ error: 'Assignment not found' });
        }
        res.send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE an assignment by ID
export const updateAssignment = async (req, res) => {
    const { error } = assignmentSchema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    // Optionally ensure course ID exists if updated
    if (req.body.course_id) {
        const course = await Course.findByPk(req.body.course_id);
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }
    }

    try {
        const updated = await Assignment.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] === 0) {
            return res.status(404).send({ error: 'Assignment not found' });
        }
        const updatedAssignment = await Assignment.findByPk(req.params.id, {
            include: [{ model: Course }]
        });
        res.send(updatedAssignment);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE an assignment by ID
export const deleteAssignment = async (req, res) => {
    try {
        const deleted = await Assignment.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).send({ error: 'Assignment not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const submitAssignment = async (req, res) => {
    try {
        const studentId = req.user.id;

        console.log(req.body);
        if (!req.body.assignment_id) {
            return res.status(400).send({ error: 'Assignment ID is required' });
        }

        if (!req.body.submission_url && !req.body.submission_content) {
            return res.status(400).send({ error: 'Submission content or URL is required' });
        }

        // Ensure the assignment exists before submitting
        const assignment = await Assignment.findByPk(req.body.assignment_id);

        if (!assignment) {
            return res.status(404).send({ error: 'Assignment not found' });
        }

        // Check due date
        const dueDate = new Date(assignment.get('due_date'));
        const currentDate = new Date();

        if (currentDate > dueDate) {
            return res.status(400).send({ error: 'Assignment is past due date' });
        }

        // Ensure the student is enrolled in the course
        const enrollment = await Enrollment.findOne({
            where: {
                student_id: studentId,
                course_id: assignment.get('course_id'),
            },
        });

        if (!enrollment) {
            return res.status(401).send({ error: 'You are not enrolled in this course' });
        }

        // Save the submission
        const submission = await AssignmentSubmission.create({
            student_id: studentId,
            submission_url: req.body.submission_url,
            submission_content: req.body.submission_content,
            course_id: assignment.get('course_id'),
            assignment_id: req.body.assignment_id, 
        });

        res.status(200).send('Assignment submitted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}