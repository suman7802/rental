import Token from '../utils/Token';
import AxiosInstance from './AxiosInstance';
import auth from '../configs/firebase';

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
