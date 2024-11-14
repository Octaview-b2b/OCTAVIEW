import axios from "axios";
import store from "../redux/store";
import { selectAccessToken } from "../redux/store";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/user', // Make sure baseURL is correct
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Optional: Set a timeout to avoid hanging requests
});

axiosInstance.interceptors.request.use((config) => {
  const token = selectAccessToken(store.getState()) || '';  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access. Token might be expired.');
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response);
    } else {
      console.error('Request failed:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
