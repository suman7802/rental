import axios from 'axios';
import Token from '../utils/Token';
import AxiosInstance from './AxiosInstance';

async function getIdTokenFromRefreshToken(refreshToken) {
  const response = await axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${
      import.meta.env.VITE_FIREBASE_API_KEY
    }`,
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }
  );
  return response.data.id_token;
}

export default async function refreshUidAndRetry(error) {
  const refreshToken = Token.retrieveRefreshToken();
  const uId = await getIdTokenFromRefreshToken(refreshToken);
  Token.store(uId, null);
  const config = error.config;
  config.headers.Authorization = `Bearer ${uId}`;
  return AxiosInstance(config);
}
