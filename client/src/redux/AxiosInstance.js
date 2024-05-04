import axios from 'axios';
import Token from '../utils/Token';
import refreshUidAndRetry from './refreshToken';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {'Content-Type': 'application/json'},
  timeout: 5000,
});

AxiosInstance.interceptors.request.use((config) => {
  const uId = Token.retrieveIdToken();
  if (uId) config.headers.Authorization = `Bearer ${uId}`;
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data.message === 'Token expired')
      return refreshUidAndRetry(error);

    return Promise.reject(
      error.response.data.message || error.message || error
    );
  }
);

export default AxiosInstance;
