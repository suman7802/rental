import {useState} from 'react';
import PropTypes from 'prop-types';

export default function AccountSetting({status}) {
  const [govId, setGovId] = useState(null);

  const handleGovIdChange = (event) => {
    setGovId(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    if (govId) data.append('govId', govId);
    if (data.has('govId')) console.log(data.get('govId'));
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

          <div className="status flex flex-row gap-2">
            <h2>Status</h2>
            <p
              className={`${
                status === 'verified' ? 'text-green-500' : 'text-red-500'
              }`}>
              {status}
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
          <button className="bg-[#EF4444] hover:bg-red-600 rounded-md py-2 text-white w-full">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

AccountSetting.propTypes = {
  status: PropTypes.string,
};
