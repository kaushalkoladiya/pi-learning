import User from '../models/userModel.js';
import Enrollment from '../models/EnrollmentModel.js';
import Assignment from '../models/AssignmentModel.js';
import Lesson from '../models/LessonModel.js';
import Course from '../models/CourseModel.js';

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
      include: { model: User, as: 'Student' },
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