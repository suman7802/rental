import {Routes, Route} from 'react-router-dom';

import ProfileHome from '../components/ProfileHome';
import Setting from '../components/settings/Index';

export default function Profile() {
  return (
    <Routes>
      <Route path="/" element={<ProfileHome />} />
      <Route path="/setting/*" element={<Setting />} />
    </Routes>
  );
}
