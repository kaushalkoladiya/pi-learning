// CertificatesModel.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Course from './CourseModel.js';

class Certificate extends Model {}

Certificate.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
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
  modelName: 'Certificate',
  tableName: 'certificates'
});

// Relationship with Course
Certificate.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Certificate, { foreignKey: 'courseId' });

Certificate.sync();

export default Certificate;

