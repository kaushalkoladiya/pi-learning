import User from '../models/userModel.js';
import Enrollment from '../models/EnrollmentModel.js';
import Assignment from '../models/AssignmentModel.js';
import Lesson from '../models/LessonModel.js';
import Course from '../models/CourseModel.js';
import AssignmentSubmission from '../models/AssignmentSubmissionModel.js';

export const getCoursesByInstructor = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { instructor_id: req.user.id }
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentsByCourse = async (req, res) => {
  const { courseId } = req.query;
  try {
    const students = await Enrollment.findAll({
      where: { course_id: courseId },
      include: { 
        model: User, as: 'Student',
        attributes: ['id', 'first_name', 'last_name'],
      },
    });
    res.status(200).json(students.map(enrollment => enrollment.Student));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssignmentsByCourse = async (req, res) => {
  const { courseId } = req.query;
  try {
    const assignments = await Assignment.findAll({
      where: { course_id: courseId },
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLessonsByCourse = async (req, res) => {
  const { courseId } = req.query;
  try {
    const lessons = await Lesson.findAll({
      where: { course_id: courseId },
    });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubmissionsByAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const submissions = await AssignmentSubmission.findAll({
      where: { assignment_id: assignmentId },
      include: [
        {
          model: User,
          as: 'Student',
          attributes: ['id', 'first_name', 'last_name'],
        }
      ],
      order: [['submission_date', 'DESC']],
    });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubmissionGrades = async (req, res) => {
  const { assignmentId, submissionId } = req.params;
  try {
    const submission = await AssignmentSubmission.findOne({
      where: { id: submissionId, assignment_id: assignmentId },
    });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveGrade = async (req, res) => {
  const { assignmentId, submissionId } = req.params;
  const { grade, feedback } = req.body;
  try {
    if (grade <= 0 || grade > 100) {
      return res.status(400).json({ error: 'Grade must be between 0 and 100' });
    }

    if (!feedback.trim() || feedback.length > 255) {
      return res.status(400).json({ error: 'Feedback must be less than 255 characters' });
    }

    const submission = await AssignmentSubmission.findOne({
      where: { id: submissionId, assignment_id: assignmentId },
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    await submission.save();
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssignmentById = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const assignment = await Assignment.findByPk(assignmentId);
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserGradesByUser = async (req, res) => {
  const { assignmentId, studentId } = req.params;
  try {
    const submission = await AssignmentSubmission.findOne({
      where: { assignment_id: assignmentId, student_id: studentId },
    });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

