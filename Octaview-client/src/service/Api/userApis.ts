import axiosInstance from "../axios/axios";

export const loginUser = async (credentials: { email: string; password: string }): Promise<any> => {
  try {
    const response = await axiosInstance.post('/login', credentials); // Assuming /login is correct
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;  // Or handle the error appropriately
  }
};
