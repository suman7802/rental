import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';

export default function EditProfile({onClose}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        onClose();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={wrapperRef}
      className="wrapper fixed z-40 bg-[#9ba3afb8] backdrop-blur-sm  md:min-w-[40vw] flex flex-col p-5 gap-5 rounded-lg">
      <div className="text-center">
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <p className="text-sm text-gray-800">Edit your profile here</p>
      </div>
      <input
        type="text"
        className="name px-4 py-2 rounded-md outline-none"
        placeholder="Name"
      />
      <input
        type="tel"
        className="phone px-4 py-2 rounded-md outline-none"
        placeholder="Phone"
      />
      <input
        type="text"
        className="bio px-4 py-2 rounded-md outline-none"
        placeholder="Bio"
      />
      <input
        type="file"
        className="image"
        accept="image/*"
        placeholder="Upload Image"
      />

      <hr className="border-black" />

      <div className="buttons flex flex-col gap-3">
        <button className="bg-gradient-to-r from-purple-500  to-pink-500 hover:to-pink-800 hover:from-purple-800 rounded-md py-2 text-white">
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-[#EF4444] hover:bg-red-600 rounded-md py-2 text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
};
