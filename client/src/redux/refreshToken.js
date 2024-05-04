import Token from '../utils/Token';
import auth from '../configs/firebase';
import AxiosInstance from './AxiosInstance';

export default async function refreshUidAndRetry(error) {
  const user = auth.currentUser;
  if (user) {
    const uId = await user.getIdToken(true);
    Token.store(uId, null);
    const config = error.config;
    config.headers.Authorization = `Bearer ${uId}`;
    return AxiosInstance(config);
  }
  return Promise.reject(error);
}
