import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import UserAddress from "../models/UserAddressModel.js";
import Joi from "joi";
import Country from "../models/CountryModel.js";
import Department from "../models/DepartmentModel.js";
import Province from "../models/ProvinceModel.js";

const checkEmpty = (value) => {
  return value === undefined || value === null || value === "";
};

const profileSchema = Joi.object({
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  phone_number: Joi.string().max(12).allow(null, ''),
  home_country: Joi.string().max(3).required(),
  department_code: Joi.string().max(3).required(),
  address: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  province_code: Joi.string().max(3).required(),
  zip_code: Joi.string().max(10).required(),
  biography: Joi.string().allow(null, ''),
  profile_pic: Joi.string().uri().allow(null, ''),
});

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: UserAddress }],
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error } = profileSchema.validate(req.body);
  if (error) {
    console.log(error.details);
    return res.status(400).json({ error: error.details[0].message });
  }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      home_country,
      department_code,
      address,
      city,
      province_code,
      zip_code,
      biography,
      profile_pic,
    } = req.body;

    const updateData = {};

    if (!checkEmpty(first_name)) {
      updateData.first_name = first_name;
    }
    if (!checkEmpty(last_name)) {
      updateData.last_name = last_name;
    }
    if (!checkEmpty(date_of_birth)) {
      updateData.date_of_birth = date_of_birth;
    }
    if (!checkEmpty(phone_number)) {
      updateData.phone_number = phone_number;
    }
    if (!checkEmpty(department_code)) {
      updateData.department_code = department_code;
    }
    if (!checkEmpty(home_country)) {
      updateData.home_country = home_country;
    }
    if (!checkEmpty(biography)) {
      updateData.biography = biography;
    }
    if (!checkEmpty(profile_pic)) {
      updateData.profile_pic = profile_pic;
    }

    await user.update(updateData);

    // Handle UserAddress update
    const addressData = {
      address: address,
      city: city,
      province_code: province_code,
      zip_code: zip_code,
    };

    const userAddress = await UserAddress.findOne({
      where: { user_id: user.id },
    });

    if (userAddress) {
      await userAddress.update(addressData);
    } else {
      addressData.user_id = user.id;
      await UserAddress.create(addressData);
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new instructor
export const createInstructor = async (req, res) => {
  const transaction = await User.sequelize.transaction();
  try {
    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });
    
    if (existingEmail != null && existingEmail.id) {
      return res.status(400).json({ error: "Email ID must be unique" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new instructor
    const instructor = await User.create(
      {
        ...req.body,
        user_type: "instructor",
        password: hashedPassword,
      },
      { transaction }
    );

    // Handle UserAddress creation
    const addressData = {
      user_id: instructor.id,
      address: req.body.address,
      city: req.body.city,
      province_code: req.body.province_code,
      zip_code: req.body.zip_code,
    };

    await UserAddress.create(addressData, { transaction });

    await transaction.commit();
    res.status(201).json(instructor);
  } catch (error) {
    await transaction.rollback();
    console.error("Error during instructor creation:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ all instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.findAll({
      where: { user_type: "instructor" },
      attributes: { exclude: ["password"] },
    });
    res.json(instructors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching instructors: " + error.message });
  }
};

// READ a single instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    const instructor = await User.findByPk(req.params.id);
    if (!instructor || instructor.user_type !== "instructor") {
      return res.status(404).json({ error: "Instructor not found" });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE an instructor by ID
export const updateInstructor = async (req, res) => {
  const transaction = await User.sequelize.transaction();
  try {
    if (req.body.phone_number) {
      const existingPhoneNumber = await User.findOne({
        where: { phone_number: req.body.phone_number },
      });
      
      if (existingPhoneNumber != null && existingPhoneNumber.id != req.params.id) {
        return res.status(400).json({ error: "Phone Number must be unique" });
      }
    }

    console.log("Request body:", req.body);
    const instructor = await User.findByPk(req.params.id);
    if (!instructor || instructor.user_type !== "instructor") {
      return res.status(404).json({ error: "Instructor not found" });
    }

    const {
      date_of_birth,
      phone_number,
      home_country,
      department_code,
      address,
      city,
      province_code,
      zip_code,
      biography,
      profile_pic,
    } = req.body;

    const updateData = {};

    if (!checkEmpty(date_of_birth)) {
      updateData.date_of_birth = date_of_birth;
    }
    if (!checkEmpty(phone_number)) {
      updateData.phone_number = phone_number;
    }
    if (!checkEmpty(department_code)) {
      updateData.department_code = department_code;
    }
    if (!checkEmpty(home_country)) {
      updateData.home_country = home_country;
    }
    if (!checkEmpty(biography)) {
      updateData.biography = biography;
    }
    if (!checkEmpty(profile_pic)) {
      updateData.profile_pic = profile_pic;
    }

    console.log("Update data:", updateData);

    await instructor.update(updateData, { transaction });

    // Handle UserAddress update
    const addressData = {
      address: address,
      city: city,
      province_code: province_code,
      zip_code: zip_code,
    };

    console.log("Address data:", addressData);

    const userAddress = await UserAddress.findOne({
      where: { user_id: instructor.id },
    });

    if (userAddress) {
      await userAddress.update(addressData, { transaction });
    } else {
      addressData.user_id = instructor.id;
      await UserAddress.create(addressData, { transaction });
    }

    await transaction.commit();
    res.json(instructor);
  } catch (error) {
    await transaction.rollback();
    console.error("Error during instructor update:", error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE an instructor by ID
export const deleteInstructor = async (req, res) => {
  try {
    await UserAddress.destroy({
      where: { user_id: req.params.id },
    });
    const deleted = await User.destroy({
      where: { id: req.params.id, user_type: "instructor" },
    });
    if (deleted === 0) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    res.status(204).json({});
  } catch (error) {
    console.error("Error during instructor deletion:", error);
    res.status(500).json({
      error:
        "Cannot delete instructor, make sure the instructor is not teaching any course!",
    });
  }
};

export const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProvinces = async (req, res) => {
  try {
    const provinces = await Province.findAll();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};