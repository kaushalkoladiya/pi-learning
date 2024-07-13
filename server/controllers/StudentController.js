import User from "../models/userModel.js";

export const getStudentDashboard = async (req, res, next) => {
  try {
    const user = await User.findByPk(
      req.user.id,
      {
        attributes: ['first_name', 'last_name', 'id'],
      }
    );

    return res.status(200).json({
      message: "Student dashboard",
      user: user.toJSON(),
    });
  } catch (error) {

  }
}