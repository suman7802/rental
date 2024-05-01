import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {'Content-Type': 'application/json'},
  timeout: 5000,
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
