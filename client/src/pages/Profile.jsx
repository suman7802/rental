import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Verified from '../assets/verify.png';
import {myUnit} from '../redux/slice/profile';

export default function Profile() {
  const dispatch = useDispatch();
  const {response, isLoading} = useSelector((state) => state.auth);
  const {unit, loading, error} = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(myUnit());
  }, [dispatch]);

  if (!response || !unit) return <div>Loading...</div>;

  const user = response?.user;
  
  console.log(unit);

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
