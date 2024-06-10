import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import Course from './CourseModel.js';  

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


Lesson.belongsTo(Course, { foreignKey: 'courseId' }); 
Course.hasMany(Lesson, { foreignKey: 'courseId' });   

Lesson.sync();

export default Lesson;
