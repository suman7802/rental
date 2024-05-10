import {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {signOut} from '../../redux/slice/auth';
import {reqVerify} from '../../redux/slice/profile';

export default function AccountSetting({status}) {
  const dispatch = useDispatch();
  const [govId, setGovId] = useState(null);
  const {response, isLoading} = useSelector((state) => state.auth);

  const handleGovIdChange = (event) => {
    setGovId(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    if (govId) data.append('govId', govId);
    if (data.has('govId')) {
      console.log(data.get('govId'));
      dispatch(reqVerify(data));
    }
  };

  return (
    <div className="wrapper flex pt-20 justify-center">
      <div className="h-screen p-5 text-gray-800 flex flex-col md:w-[50vw]">
        <h1 className="text-2xl font-bold  mb-5">Account Setting</h1>

        <div className="verifyAccount flex flex-col gap-3">
          <h2 className="text-xl font-bold text-center">Verify Account</h2>
          <p className="text-base">
            To verify your account, please upload a valid ID card or passport.
          </p>

          <div className="status flex flex-row gap-2 items-center">
            <h2 className="font-bold text-lg">Status</h2>
            <p
              className={`${
                response?.user?.verified ? 'text-green-500' : 'text-red-500'
              } capitalize font-semibold text-base`}>
              {response?.user?.verified}
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
              Upload
            </button>
          </form>
          <div className="note">
            <p className="text-sm">
              Note: Your ID card or passport should be valid and not expired. it
              should be in the format of jpg, jpeg or png. and it take 1-2 days
              to verify your account.
            </p>
          </div>
        </div>
        <hr className="mt-6 " />
        <div className="logout">
          <h2 className="text-2xl font-bold  my-5 text-center">Log out</h2>

          <div className="bg-[#EF4444] hover:bg-red-600 rounded-md py-2 text-white w-full flex items-center justify-center">
            {!isLoading && response && (
              <Link onClick={() => dispatch(signOut())} to="/">
                Sign out
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AccountSetting.propTypes = {
  status: PropTypes.string,
};
