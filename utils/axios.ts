import axios from 'axios';
import { getToken } from './getToken'; // Import the helper function

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Fetch the token using the helper
    console.log('Access Token:', token); // Log the token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error); // Log error for debugging
    return Promise.reject(error);
  }
);

export default axiosInstance;
