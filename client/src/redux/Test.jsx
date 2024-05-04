import AxiosInstance from './AxiosInstance';

export const getProfile = async () => {
  try {
    const response = await AxiosInstance.get('/auth/getprofile');
    return response.data;
  } catch (error) {
    return error;
  }
};

export default function Test() {
  return (
    <div>
      <h1>Test</h1>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
}
