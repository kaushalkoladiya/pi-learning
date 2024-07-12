import { DataTypes, Model } from 'sequelize';
import { DATABASE_TABLES, USER_ROLES, GENDER_TYPE } from '../constants/tables.js';
import sequelize from '../database.js';
import Department from './DepartmentModel.js';
import Country from './CountryModel.js';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  user_type: {
    type: DataTypes.ENUM(USER_ROLES.ADMIN, USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM(GENDER_TYPE.MALE, GENDER_TYPE.FEMALE, GENDER_TYPE.OTHER),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING(12),
    defaultValue: 'Not Provided',
  },
  department_code: { 
    type: DataTypes.STRING(3),
    references: {
      model: Department,
      key: 'code',
    },
    allowNull: true,
  },
  biography: {
    type: DataTypes.TEXT,
    defaultValue: 'Not Provided',
  },
  home_country: {
    type: DataTypes.STRING,
    references: {
      model: Country,
      key: 'code',
    },
    allowNull: true,
  },
  profile_pic: {
    type: DataTypes.STRING,
    defaultValue: null,
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
  sequelize: sequelize,
  modelName: DATABASE_TABLES.USER,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.sync();
export default User;
