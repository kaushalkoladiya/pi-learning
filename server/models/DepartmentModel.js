import { DataTypes, Model } from 'sequelize';
import { DATABASE_TABLES } from '../constants/tables.js';
import sequelize from '../database.js';

class Department extends Model {}

Department.init({
  code: {
    type: DataTypes.STRING(3),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: DATABASE_TABLES.DEPARTMENT,
  timestamps: false,
});

Department.sync();
export default Department;

