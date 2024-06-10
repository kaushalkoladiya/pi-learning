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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  courseCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  stripeProductId: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  stripePriceId: {
    type: DataTypes.STRING, 
    allowNull: true  
  }
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',  
  timestamps: true  
});


Course.belongsTo(User, { as: 'Instructor', foreignKey: 'instructorId' });
User.hasMany(Course, { foreignKey: 'instructorId' });

Course.sync();

export default Course;