import {useSelector} from 'react-redux';

export default function Profile() {
  const {response, isLoading} = useSelector((state) => state.auth);

  if (!isLoading) {
    console.log(response?.user);
  }

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
