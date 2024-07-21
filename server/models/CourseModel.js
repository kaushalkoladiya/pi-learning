import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import User from './userModel.js';  
import Program from './ProgramModel.js';

class Course extends Model {}

Course.init({
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  course_description: {
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
    type: DataTypes.INTEGER,
    references: {
      model: Program,
      key: 'program_id',
    },
    allowNull: false,
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'RESTRICT',
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
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Course.belongsTo(User, { as: 'Instructor', foreignKey: 'instructor_id' });
User.hasMany(Course, { foreignKey: 'instructor_id' });

Course.sync();

export default Course;

