import {Routes, Route} from 'react-router-dom';

import AccountSetting from './AccountSetting';

export default function Setting() {
  return (
    <Routes>
      <Route path="/" element={<AccountSetting />} />
    </Routes>
  );
}
