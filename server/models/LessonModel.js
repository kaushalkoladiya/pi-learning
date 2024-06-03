import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; // Make sure to import your Sequelize connection instance
import Course from './CourseModel.js';  // Ensure the Course model is imported if it's in a different file

class Lesson extends Model {}

Lesson.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true  
  },
  files: {
    type: DataTypes.JSON, 
    allowNull: true  
  },
  videos: {
    type: DataTypes.JSON, 
    allowNull: true  
  }
}, {
  sequelize,
  modelName: 'Lesson',
  tableName: 'lessons',  
  timestamps: true  
});

// Define relationships
Lesson.belongsTo(Course, { foreignKey: 'courseId' });  // Link each lesson to a course
Course.hasMany(Lesson, { foreignKey: 'courseId' });    // A course can have many lessons

Lesson.sync();

export default Lesson;
