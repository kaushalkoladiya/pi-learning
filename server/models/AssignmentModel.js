import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';  // Import your database connection
import Course from './CourseModel.js';  // Ensure the Course model is imported

class Assignment extends Model {}

Assignment.init({
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
    allowNull: true  // Allow null if you want the description to be optional
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Assignment',
  tableName: 'assignments'
});
Assignment.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Assignment, { foreignKey: 'courseId' });

Assignment.sync();

export default Assignment;
