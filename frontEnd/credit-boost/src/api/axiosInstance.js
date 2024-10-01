import axios from 'axios';

const baseURL = import.meta.env.VITE_PRODUCTION === 'true'
                            ? import.meta.env.VITE_PROD_URL
                            : import.meta.env.VITE_DEV_URL;

const axiosInstance = axios.create({
  baseURL: baseURL, // Use the baseURL determined by the environment
  withCredentials: true,
  headers: {'Content-Type' : 'application/json'},
});

export default axiosInstance;

