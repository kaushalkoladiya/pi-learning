import { DataTypes, Model } from 'sequelize';
import { DATABASE_TABLES } from '../constants/tables.js';
import sequelize from '../database.js';
import Program from './ProgramModel.js';
import User from './userModel.js';

class Course extends Model {}

Course.init({
  course_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  course_title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'New Course',
  },
  short_description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'This is a new course',
  },
  long_description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'This is a new course',
  },
  program_id: {
    type: DataTypes.STRING(8),
    references: {
      model: Program,
      key: 'program_id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'RESTRICT',
  },
  profile_pic: {
    type: DataTypes.STRING,
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
  sequelize: sequelize,
  modelName: DATABASE_TABLES.COURSE,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Course.sync();

export default Course;


