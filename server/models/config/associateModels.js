import User from '../userModel.js';
import UserAddress from '../UserAddressModel.js';
import Department from '../DepartmentModel.js';
import Country from '../CountryModel.js';
import Province from '../ProvinceModel.js';

const associateModels = () => {
  // Define relationships
  User.hasOne(UserAddress, { foreignKey: 'user_id' });
  UserAddress.belongsTo(User, { foreignKey: 'user_id' });

  User.belongsTo(Department, { foreignKey: 'department_code', targetKey: 'code' });
  Department.hasMany(User, { foreignKey: 'department_code', sourceKey: 'code' });

  User.belongsTo(Country, { foreignKey: 'home_country', targetKey: 'code' });
  Country.hasMany(User, { foreignKey: 'home_country', sourceKey: 'code' });

  UserAddress.belongsTo(Province, { foreignKey: 'province_code', targetKey: 'code' });
  Province.hasMany(UserAddress, { foreignKey: 'province_code', sourceKey: 'code' });
};

export default associateModels;