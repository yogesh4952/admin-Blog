// lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
