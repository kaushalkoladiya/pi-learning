import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import { DATABASE_TABLES } from '../constants/tables.js';
import Department from './DepartmentModel.js';

class Program extends Model {}

Program.init({
  program_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  program_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  long_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  department_code: {
    type: DataTypes.STRING,
    references: {
      model: Department,
      key: 'code',
    },
    allowNull: false,
  },
  duration_in_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profile_pic: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: DATABASE_TABLES.PROGRAM,
  timestamps: false,
});

export default Program;
