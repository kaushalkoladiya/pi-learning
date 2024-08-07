import { axiosInstance } from ".";

export const fetchAssignments = async () => {
  return await axiosInstance.get('/api/assignments/student');
};

export const fetchAssignmentsByCourse = async (courseId) => {
  return await axiosInstance.get(`/api/assignments/course/${courseId}`);
};

export const submitAssignment = async (assignmentId, data) => {
  return await axiosInstance.post(`/api/assignments/submit/${assignmentId}`, data);
};

export const fetchSubmissionsForAssignment = async (assignmentId) => {
  return await axiosInstance.get(`/api/assignments/submissions/${assignmentId}`);
};

export const fetchCertificates = async () => {
  return await axiosInstance.get('/api/certificates');
};