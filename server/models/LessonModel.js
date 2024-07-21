import { DataTypes, Model } from 'sequelize';
import { DATABASE_TABLES } from '../constants/tables.js';
import sequelize from '../database.js'; 
import Course from './CourseModel.js';  
import Program from './ProgramModel.js';

class Lesson extends Model {}

Lesson.init({
  lesson_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lesson_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lesson_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  program_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Program,
      key: 'program_id',
    },
    onDelete: 'CASCADE',
  },
  course_id: {
    type: DataTypes.STRING,
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
  modelName: DATABASE_TABLES.LESSON,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Lesson.sync();

export default Lesson;

