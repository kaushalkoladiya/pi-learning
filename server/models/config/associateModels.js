import User from "../userModel.js";
import UserAddress from "../UserAddressModel.js";
import Course from "../CourseModel.js";
import Department from "../DepartmentModel.js";
import Country from "../CountryModel.js";
import Province from "../ProvinceModel.js";
import Program from "../ProgramModel.js";
import Lesson from "../LessonModel.js";
import LessonFile from "../LessonFileModel.js";
import Assignment from "../AssignmentModel.js";

const associateModels = () => {
  // Define relationships
  User.hasOne(UserAddress, { foreignKey: "user_id" });
  UserAddress.belongsTo(User, { foreignKey: "user_id" });

  User.belongsTo(Department, {
    foreignKey: "department_code",
    targetKey: "code",
  });
  Department.hasMany(User, {
    foreignKey: "department_code",
    sourceKey: "code",
  });

  User.belongsTo(Country, { foreignKey: "home_country", targetKey: "code" });
  Country.hasMany(User, { foreignKey: "home_country", sourceKey: "code" });

  UserAddress.belongsTo(Province, {
    foreignKey: "province_code",
    targetKey: "code",
  });
  Province.hasMany(UserAddress, {
    foreignKey: "province_code",
    sourceKey: "code",
  });

  Program.belongsTo(Department, {
    foreignKey: "department_code",
    targetKey: "code",
  });
  Department.hasMany(Program, {
    foreignKey: "department_code",
    sourceKey: "code",
  });

  Course.belongsTo(User, { as: "Instructor", foreignKey: "instructor_id" });
  User.hasMany(Course, { foreignKey: "instructor_id" });

  Course.belongsTo(Program, { foreignKey: "program_id" });
  Program.hasMany(Course, { foreignKey: "program_id" });

  Lesson.belongsTo(Course, { foreignKey: "course_id" });
  Course.hasMany(Lesson, { foreignKey: "course_id" });

  Lesson.belongsTo(Program, { foreignKey: "program_id" });
  Program.hasMany(Lesson, { foreignKey: "program_id" });

  LessonFile.belongsTo(Lesson, { foreignKey: "lesson_id" });
  Lesson.hasMany(LessonFile, { foreignKey: "lesson_id" });

  Assignment.belongsTo(Lesson, { foreignKey: "lesson_id" });
  Lesson.hasMany(Assignment, { foreignKey: "lesson_id" });
};

export default associateModels;
