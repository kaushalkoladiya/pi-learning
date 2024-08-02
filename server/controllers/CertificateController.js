import Certificate from "../models/CertificateModel.js";
import Course from "../models/CourseModel.js";
import Assignment from "../models/AssignmentModel.js";
import AssignmentSubmission from "../models/AssignmentSubmissionModel.js";
import User from "../models/userModel.js";
import IssuedCertificate from "../models/IssueCertificateModel.js";

// Check if the student has submitted all assignments for a course and issue a certificate if eligible
export const issueCertificate = async (req, res) => {
  try {
    const instructorId = req.user.id; // Assuming instructor is logged in and JWT provides their ID
    const { courseId, studentId } = req.body;

    console.log('courseId:', courseId);
    console.log('studentId:', studentId);
    

    // Check if the instructor teaches the course
    const course = await Course.findOne({ where: { course_id: courseId, instructor_id: instructorId } });
    if (!course) {
      return res.status(403).json({ message: "You do not have permission to issue a certificate for this course." });
    }

    // Fetch all assignments for the course
    const assignments = await Assignment.findAll({ where: { course_id: courseId } });

    // Fetch all submissions for the student in the course
    const submissions = await AssignmentSubmission.findAll({
      where: {
        course_id: courseId,
        student_id: studentId
      }
    });

    // Check if the student has submitted all assignments
    if (submissions.length >= assignments.length) {
      // Issue a certificate

      const certificate = await Certificate.findOrCreate({ 
        where: { courseId }, 
        defaults: { 
          courseId,
          name: `${course.course_title} Certificate`
        } 
      });

      const certificateId = certificate[0].getDataValue('id') || 0;

      const newCertificate = await IssuedCertificate.create({
        certificateId:  certificateId,
        userId: studentId,
        issueDate: new Date()
      });

      return res.status(200).json({ message: "Certificate issued successfully.", certificate: newCertificate });
    } else {
      return res.status(400).json({ error: "All assignments must be submitted to issue a certificate." });
    }
  } catch (error) {
    console.error('Error issuing certificate:', error);
    return res.status(500).json({ error: 'An error occurred while issuing the certificate.' });
  }
};

// Fetch all certificates for a student
export const getCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    const certificates = await IssuedCertificate.findAll({
      where: { userId },
      include: [
        { 
          model: Certificate, 
          include: [{
            model: Course,
            include: [{
              model: User,
              as: 'Instructor',
              attributes: ['first_name', 'last_name']
            }]
          }]
        }
      ]
    });

    return res.status(200).json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the certificates.' });
  }
};
