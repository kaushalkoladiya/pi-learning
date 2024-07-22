import { getToken } from "@/constants";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": getToken(),
  },
});

export const fetchSecretKey = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/token/key`
    );
    console.log("Fetched Secret Key:", response.data.secretKey);
    return response.data.secretKey;
  } catch (error) {
    console.error("Error fetching secret key:", error);
    return null;
  }
};

export const registerUser = async (email, password, firstName, lastName, gender) => {
  return await axiosInstance.post(
    `/api/auth/register`,
    {
      password,
      email,
      user_type: "student",
      first_name: firstName,
      last_name: lastName,
      gender,
    }
  );
};

export const loginUser = async (email, password) => {
  return await axiosInstance.post(
    `/api/auth/login`,
    {
      email,
      password,
    }
  );
};

export const getStudentDashboard = async () => {
  return await axiosInstance.get(
    `/api/student/dashboard`
  );
};

export const getStudentCourses = async () => {
  return await axiosInstance.get(
    `/courses`
  );
};

export const getCourseById = async (courseId) => {
  return await axiosInstance.get(
    `/courses/${courseId}`
  );
};

export const enrollCourse = async (courseId) => {
  return await axiosInstance.post(
    `/courses/${courseId}/enroll`
  );
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axiosInstance.post(
    `/api/uploads`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const submitAssignment = async (id, payload) => {
  return await axiosInstance.post(
    `/api/assignments/submit`,
    {
      assignment_id: id,
      ...payload,
    }
  );
};
