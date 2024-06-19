import { DataTypes, Model } from 'sequelize';
import { DATABASE_TABLES, USER_ROLES } from '../constants/tables.js';
import sequelize from '../database.js';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
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
