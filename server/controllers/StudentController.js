import Assignment from "../models/AssignmentModel.js";
import Course from "../models/CourseModel.js";
import Enrollment from "../models/EnrollmentModel.js";
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
        attributes: ['course_name', 'course_code', 'course_description'],
      }],
    });

    const assignments = await Assignment.findAll({
      where: {
        course_id: enrolledCourses.map(course => course.course_id),
      },
      include: [
        {
          model: Course,
          as: 'Course',
          attributes: ['course_name', 'course_code'],
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