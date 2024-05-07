import {useDispatch} from 'react-redux';
import {fetchProfile} from './slice/auth';

export default function Test() {
  const dispatch = useDispatch();

  const getProfile = async (e) => {
    e.preventDefault();
    dispatch(fetchProfile());
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
}
