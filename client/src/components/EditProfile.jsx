import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {editProfile} from '../redux/slice/profile';

export default function EditProfile({onClose}) {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const {response} = useSelector((state) => state.auth);
  const {loading} = useSelector((state) => state.profile);

  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState(response.user.bio);
  const [name, setName] = useState(response.user.name);
  const [phone, setPhone] = useState(response.user.phone);

  const onChange = (event) => {
    const {name, value} = event.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
    if (name === 'bio') setBio(value);
    if (name === 'profile') setProfile(value);
  };

  const handleProfileChange = (event) => {
    setProfile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    if (name !== response.user.name) data.append('name', name);
    if (phone !== response.user.phone) data.append('phone', phone);
    if (bio !== response.user.bio) data.append('bio', bio);
    if (profile) data.append('profile', profile);

    if (
      data.has('bio') ||
      data.has('name') ||
      data.has('phone') ||
      data.has('profile')
    ) {
      dispatch(editProfile(data));
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target))
        onClose();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <form
      ref={popupRef}
      onSubmit={handleSubmit}
      className="wrapper fixed z-40 bg-[#9ba3afb8] backdrop-blur-sm  md:min-w-[40vw] flex flex-col p-5 gap-5 rounded-lg">
      <div className="text-center">
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <p className="text-sm text-gray-800">Edit your profile here</p>
      </div>

      <input
        name="name"
        value={name}
        onChange={onChange}
        type="text"
        className="name px-4 py-2 rounded-md outline-none"
        placeholder="Name"
      />

      <input
        name="phone"
        value={phone}
        onChange={onChange}
        type="text"
        className="phone px-4 py-2 rounded-md outline-none"
        placeholder="Phone"
      />

      <textarea
        name="bio"
        value={bio}
        onChange={onChange}
        rows="4"
        className="bio px-4 py-2 rounded-md outline-none"
        placeholder="Bio"
      />

      <input
        type="file"
        className="profile"
        onChange={handleProfileChange}
        accept="image/*"
        placeholder="Upload Image"
      />

      <hr className="border-black" />

      <div className="buttons flex flex-col gap-3">
        <button className="bg-gradient-to-r from-purple-500  to-pink-500 hover:to-pink-800 hover:from-purple-800 rounded-md py-2 text-white">
          {loading ? 'Loading...' : 'Save'}
        </button>
        <button
          onClick={onClose}
          className="bg-[#EF4444] hover:bg-red-600 rounded-md py-2 text-white">
          Cancel
        </button>
      </div>
    </form>
  );
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
};
