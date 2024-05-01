import {Routes, Route} from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function App() {
  return (
    <Routes>
      <Route path="*" index element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
