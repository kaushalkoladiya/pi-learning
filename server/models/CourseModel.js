import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import User from './userModel.js';  

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  course_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  course_code: {
    type: DataTypes.STRING(20),
    unique: true,
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

