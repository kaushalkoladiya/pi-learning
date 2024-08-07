import Assignment from "../models/AssignmentModel.js";
import AssignmentSubmission from "../models/AssignmentSubmissionModel.js";
import Certificate from "../models/CertificateModel.js";
import Course from "../models/CourseModel.js";
import Enrollment from "../models/EnrollmentModel.js";
import IssuedCertificate from "../models/IssueCertificateModel.js";
import LessonFile from "../models/LessonFileModel.js";
import Lesson from "../models/LessonModel.js";
import User from "../models/userModel.js";

export const getStudentDashboard = async (req, res, next) => {
  try {
    const userId = +req.user.id;

    const user = await User.findByPk(
      userId,
      {
        attributes: ['first_name', 'last_name', 'id'],
      }
    );

    const enrolledCourses = await Enrollment.findAll({
      where: {
        student_id: userId,
      },
      include: [{
        model: Course,
        as: 'Course',
        attributes: ['course_id', 'course_title', 'short_description', 'long_description'],
      }],
    });

    const assignments = await Assignment.findAll({
      where: {
        course_id: enrolledCourses.map(course => course.course_id),
      },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['course_title', 'short_description'],
        },
        {
          model: AssignmentSubmission,
          where: { student_id: req.user.id },
          required: false,
          attributes: ['id']
        }
      ],
    });

    return res.status(200).json({
      message: "Student dashboard",
      user,
      enrolledCourses,
      assignments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

export const getStudentCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: User,
        as: 'Instructor',
        attributes: ['first_name', 'last_name', 'profile_pic'],
      }
    });

    return res.status(200).json({
      courses
    });
  } catch (error) {

  }
};
export const getCourseDetails = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCourseLessons = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.findAll({
      where: { course_id: courseId },
      order: [['created_at', 'ASC']],
      include: {
        model: LessonFile,
      }
    });

    return res.status(200).json(lessons);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const checkEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = +req.user.id;

    const enrollment = await Enrollment.findOne({
      where: { student_id: userId, course_id: courseId }
    });

    return res.status(200).json({ isEnrolled: !!enrollment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const course_id = +(req.params.courseId || 0);

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