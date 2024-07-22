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

