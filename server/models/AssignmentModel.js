import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import { DATABASE_TABLES } from '../constants/tables.js';
import Course from './CourseModel.js';
import Lesson from './LessonModel.js';

class Assignment extends Model {}

Assignment.init({
  assignment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  assignment_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  assignment_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "NULL"
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Lesson,
      key: 'lesson_id',
    },
    onDelete: 'CASCADE',
  },
  course_id: {
    type: DataTypes.STRING(8),
    allowNull: false,
    references: {
      model: Course,
      key: 'course_id',
    },
    onDelete: 'CASCADE',
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
  sequelize: sequelize,
  modelName: DATABASE_TABLES.ASSIGNMENT,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Assignment.sync();

export default Assignment;

