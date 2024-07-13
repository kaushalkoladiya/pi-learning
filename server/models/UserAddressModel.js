import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import { DATABASE_TABLES } from '../constants/tables.js';
import User from './userModel.js';
import Province from './ProvinceModel.js';  // Import the new Province model

class UserAddress extends Model {}

UserAddress.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province_code: {
    type: DataTypes.STRING,
    references: {
      model: Province,  // Reference the Province model
      key: 'code',
    },
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'CANADA',
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: DATABASE_TABLES.USER_ADDRESS,
  timestamps: false,
});

UserAddress.sync();
export default UserAddress;

