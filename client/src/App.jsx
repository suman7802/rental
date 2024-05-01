import Footer from './Footer';
import NavBar from './NavBar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Auth from './pages/Auth';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App() {
  return (
    <div className="relative text-lg xl:text-xl 2xl:text-2xl">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
