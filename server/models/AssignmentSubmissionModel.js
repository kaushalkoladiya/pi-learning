import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Course from './CourseModel.js';
import User from './userModel.js';
import Assignment from './AssignmentModel.js';

class AssignmentSubmission extends Model { }

AssignmentSubmission.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  submission_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  submission_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  grade: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  submission_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'AssignmentSubmission',
  tableName: 'assignment_submissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

AssignmentSubmission.sync();

AssignmentSubmission.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(AssignmentSubmission, { foreignKey: 'course_id' });
AssignmentSubmission.belongsTo(User, { as: 'Student', foreignKey: 'student_id' });
User.hasMany(AssignmentSubmission, { foreignKey: 'student_id' });
AssignmentSubmission.belongsTo(Assignment, { foreignKey: 'assignment_id' });
Assignment.hasMany(AssignmentSubmission, { foreignKey: 'assignment_id' });


export default AssignmentSubmission;
