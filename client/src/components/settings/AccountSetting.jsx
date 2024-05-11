import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {signOut} from '../../redux/slice/auth';
import {reqVerify} from '../../redux/slice/profile';

export default function AccountSetting() {
  const dispatch = useDispatch();
  const [govId, setGovId] = useState(null);
  const {response} = useSelector((state) => state.auth);
  const {statusCode, loading, error} = useSelector((state) => state.profile);

  useEffect(() => {
    if (statusCode === 'fulfilled') {
      window.location.reload();
    }
  }, [statusCode]);

  const handleGovIdChange = (event) => {
    setGovId(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    if (govId) data.append('govId', govId);
    if (data.has('govId')) dispatch(reqVerify(data));
  };

  const getStatus = (status) => {
    switch (status) {
      case 'notVerified':
        return {text: 'Unverified', color: 'text-blue-500'};
      case 'requested':
        return {text: 'Requested', color: 'text-yellow-500'};
      case 'rejected':
        return {text: 'Rejected', color: 'text-red-500'};
      case 'verified':
        return {text: 'Verified', color: 'text-green-500'};
      default:
        return {text: 'Unknown', color: 'text-gray-500'};
    }
  };

  return (
    <div className="wrapper flex pt-20 justify-center">
      <div className="h-screen p-5 text-gray-800 flex flex-col md:w-[50vw]">
        <h1 className="text-2xl font-bold  mb-5">Account Setting</h1>

        {response?.user?.verified !== 'verified' && (
          <>
            <div className="verifyAccount flex flex-col gap-3">
              <h2 className="text-xl font-bold text-center">Verify Account</h2>
              <p className="text-base">
                To verify your account, please upload a valid ID card or
                passport.
              </p>

              <div className="status flex flex-row gap-2 items-center">
                <h2 className="font-bold text-lg">Status</h2>
                <p
                  className={`${
                    getStatus(response?.user?.verified).color
                  } capitalize font-semibold text-base`}>
                  {getStatus(response?.user?.verified).text}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="upload flex flex-col items-start gap-2">
                <input
                  type="file"
                  name="govId"
                  className="govId"
                  onChange={handleGovIdChange}
                  accept="image/*"
                  placeholder="Government ID"
                />
                <button
                  type="submit"
                  className="mt-2 bg-[#EF4444] hover:bg-red-600 rounded-md py-2 text-white w-full">
                  Upload{loading && 'ing...'}
                </button>
                {error && (
                  <p className="errorMessage text-red-500 text-base font-semibold">
                    {error}
                  </p>
                )}
              </form>
              <div className="note">
                <p className="text-sm">
                  Note: Your ID card or passport should be valid and not
                  expired. it should be in the format of jpg, jpeg or png. and
                  it take 1-2 days to verify your account.
                </p>
              </div>
            </div>
            <hr className="mt-6 " />
          </>
        )}
        <div className="logout">
          <h2 className="text-2xl font-bold  my-5 text-center">Log out</h2>

          <div className="bg-[#EF4444] hover:bg-red-600 rounded-md py-2 text-white w-full flex items-center justify-center">
            <Link onClick={() => dispatch(signOut())} to="/">
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
