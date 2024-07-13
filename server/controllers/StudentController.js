export const getStudentDashboard = (req, res, next) => {
  try {
    res.status(200).json({ message: "Student dashboard" });
  } catch (error) {
    
  }
}