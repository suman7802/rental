import {useSelector} from 'react-redux';
import Verified from '../assets/verify.png';

export default function Profile() {
  const {response, isLoading} = useSelector((state) => state.auth);
  if (isLoading || !response) return <div>Loading...</div>;

  const user = response?.user;
  console.log(user);

  return (
    <section className="min-h-screen pt-28">
      <div className="profile flex flex-col items-center">
        <div className="avatar relative">
          <img
            src={user.profile}
            alt="profile"
            className="rounded-full max-h-40 max-w-40"
          />
          {user.verified === 'notVerified' && (
            <img
              src={Verified}
              alt="Verified"
              className="h-5 absolute top-[65%] right-0"
            />
          )}
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </section>
  );
}
