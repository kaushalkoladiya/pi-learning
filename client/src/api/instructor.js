import { axiosInstance } from ".";

export const getCoursesByInstructor = async () => {
  try {
    return await axiosInstance.get(
      `/api/instructor/courses`
    );
  } catch (error) {
    console.error("Error fetching secret key:", error);
    return null;
  }
};

export const getStudentsByCourse = async (courseId) => {
  try {
    return await axiosInstance.get(
      `/api/instructor/students?courseId=${courseId}`
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return null;
  }
};

export const getAssignmentsByCourse = async (courseId) => {
  try {
    return await axiosInstance.get(
      `/api/instructor/assignments?courseId=${courseId}`
    );
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return null;
  }
};

export const getLessonsByCourse = async (courseId) => {
  try {
    return await axiosInstance.get(
      `/api/instructor/lessons?courseId=${courseId}`
    );
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return null;
  }
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  try {
    return await axiosInstance.get(
      `/api/instructor/courses/assignments/${assignmentId}/submissions`
    );
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return null;
  }
};

export const submitGrade = async (assignmentId, submissionId, grade, feedback) => {
  return await axiosInstance.put(
    `/api/instructor/courses/assignments/${assignmentId}/submissions/${submissionId}`,
    { grade, feedback }
  );
};

export const getAssignmentById = async (assignmentId) => {
  return await axiosInstance.get(
    `/api/instructor/assignment/${assignmentId}`
  );
};

export const getUserSubmissionsByAssignment = async (assignmentId, userId) => {
  return await axiosInstance.get(
    `/api/instructor/assignments/${assignmentId}/students/${userId}/submissions`
  );
};

export const issueCertificate = async (courseId, studentId) => {
  return await axiosInstance.post(`/api/certificates/issue`, { courseId, studentId });
};
