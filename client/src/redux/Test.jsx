import AxiosInstance from './AxiosInstance';

export const getProfile = async () => {
  try {
    const response = await AxiosInstance.get('/auth/getprofile');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
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
