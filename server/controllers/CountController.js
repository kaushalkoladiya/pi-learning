import User from '../models/userModel.js';
import Program from '../models/ProgramModel.js';
import Lesson from "../models/LessonModel.js";
import Course from "../models/CourseModel.js";
import Assignment from "../models/AssignmentModel.js";

export const getCounts = async (req, res) => {
    try {
      const instructorsCount = await User.count({ where: { user_type: 'instructor' } });
      const programsCount = await Program.count();
      const coursesCount = await Course.count();
      const lessonsCount = await Lesson.count();
      const assignmentsCount = await Assignment.count();
  
      console.log(instructorsCount);
      res.json({
        instructors: instructorsCount,
        programs: programsCount,
        courses: coursesCount,
        lessons: lessonsCount,
        assignments: assignmentsCount,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };