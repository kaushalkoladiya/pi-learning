import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
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