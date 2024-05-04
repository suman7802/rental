import {Routes, Route} from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Reset from '../components/Reset';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  );
}
