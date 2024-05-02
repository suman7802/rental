import axios from 'axios';
import AccessToken from '../utils/AccessToken';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {'Content-Type': 'application/json'},
  timeout: 5000,
});

AxiosInstance.interceptors.request.use((config) => {
  const token = AccessToken.retrieve();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response.data.message || error.message || error
    );
  }
);

export default AxiosInstance;
