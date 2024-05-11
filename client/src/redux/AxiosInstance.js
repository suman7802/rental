import axios from 'axios';
import Token from '../utils/Token';
import refreshUidAndRetry from './refreshToken';

const baseURL =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_PROD_API_URL;

const AxiosInstance = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/json'},
  timeout: 5000,
});

AxiosInstance.interceptors.request.use((config) => {
  const uId = Token.retrieveIdToken();
  if (uId) config.headers.Authorization = `Bearer ${uId}`;
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.message === 'Token expired')
      return refreshUidAndRetry(error);
    return Promise.reject(
      error.response.data.message || error.message || error
    );
  }
);

export default AxiosInstance;
