import axiosInstance from "../axios/axios";

export const loginUser = async (credentials: { email: string; password: string }): Promise<any> => {
  try {
    const response = await axiosInstance.post('/login', credentials); 
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

export const signupUser = async ():Promise<any>=>{
  try {
    const response = await axiosInstance.post('/signup')
    return response.data
  } catch (error) {
    console.log("signup failed",error);
    throw error
  }
}
