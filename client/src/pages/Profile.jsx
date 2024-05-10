import {Routes, Route} from 'react-router-dom';

import ProfileHome from '../components/Profile';
import AccountSetting from '../components/settings/AccountSetting';

export default function Profile() {
  return (
    <Routes>
      <Route path="/" element={<ProfileHome />} />
      <Route path="/account" element={<AccountSetting />} />
    </Routes>
  );
}
