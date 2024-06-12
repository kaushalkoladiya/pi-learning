import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import User from './userModel.js';
import Course from './CourseModel.js';

class Enrollment extends Model {}

Enrollment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  stripeSessionId: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Enrollment',
  tableName: 'enrollments'
});


User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { as: 'Student', foreignKey: 'userId' });

Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

Enrollment.sync();

export default Enrollment;
