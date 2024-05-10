import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';

import Verified from '../assets/verify.png';
import MyUnits from '../components/MyUnits';
import {myUnit} from '../redux/slice/profile';
import EditProfile from '../components/EditProfile';

export default function Profile() {
  const dispatch = useDispatch();
  const [showPOPUP, setShowPOPUP] = useState(false);
  const {response, isLoading} = useSelector((state) => state.auth);
  const {unit, statusCode} = useSelector((state) => state.profile);

  const togglePOPUP = () => {
    setShowPOPUP(() => !showPOPUP);
  };

  useEffect(() => {
    dispatch(myUnit());
  }, [dispatch]);

  useEffect(() => {
    if (statusCode === 'fulfilled') {
      window.location.reload();
    }
  }, [statusCode]);

  const user = response?.user;

  return (
    <section className="relative min-h-screen p-10 flex flex-col gap-5 items-center">
      {isLoading ? (
        <p className="absolute top-[50%]">Loading...</p>
      ) : (
        <>
          <button className="absolute More top-[6rem] right-5 flex flex-row gap-3 items-center">
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="text-black text-[1.5rem]"
            />
          </button>
          <div className="profile flex flex-col items-center gap-1 mt-20">
            <div className="avatar relative">
              <img
                src={user?.profile}
                alt="profile"
                className="rounded-full object-cover w-40 h-40 border-4 border-gray-300"
              />
              {user?.verified === 'verified' && (
                <img
                  src={Verified}
                  alt="Verified"
                  className="h-5 absolute top-[65%] right-0"
                />
              )}
            </div>
            {showPOPUP && <EditProfile onClose={() => setShowPOPUP(false)} />}

            <div className="flex flex-col items-center">
              <div className="nameAndEdit flex flex-row items-baseline">
                <h1 className="text-xl font-bold">{user?.name}</h1>
                <button className="text-sm text-blue-500" onClick={togglePOPUP}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="text-black text-[.7rem] ml-1 mb-[1px]"
                  />
                </button>
              </div>
              <p className="text-sm text-gray-500">{user?.phone}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <div className="bio">
              <p className="text-center text-base text-gray-500 max-w-[50vw] md:max-w-[25vw]">
                {user?.bio ? user?.bio : 'No bio available'}
              </p>
            </div>
          </div>

          <div className="units my-5">
            <h1 className="text-xl font-semibold text-center mb-4">
              Your Listings
            </h1>
            <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5">
              {unit.map((property, index) => (
                <MyUnits
                  key={index}
                  propertyImage={property?.Media[0]?.url}
                  rentPrice={property.rent}
                  rentCurrency={property.rentCurrency}
                  rentPeriod={property.rentPeriod}
                  propertyName={property.title}
                  propertyLocation={property.propertyLocation}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
