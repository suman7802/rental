import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchProfile} from './redux/slice/auth';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './home/Index';
import Test from './redux/Test';
import Auth from './pages/Auth';
import About from './pages/About';
import Token from './utils/Token';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export default function App() {
  const dispatch = useDispatch();

  const haveToken = Token.retrieveIdToken();

  useEffect(() => {
    if (haveToken) dispatch(fetchProfile());
  }, [dispatch, haveToken]);

  return (
    <div className="relative text-lg xl:text-xl 2xl:text-2xl">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/profile/*" element={<Profile />} />

          <Route path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
