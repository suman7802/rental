import PopUpNav from './PopUpNav';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faPlus, faUser} from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/Rental.png';

export default function NavBar() {
  const {response} = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const location = useLocation();

  const togglePopUpNav = (event) => {
    event.stopPropagation();
    setShow((show) => !show);
  };

  useEffect(() => {
    const hidePopUpNav = () => {
      setShow(false);
    };
    if (show) document.addEventListener('click', hidePopUpNav);
    return () => document.removeEventListener('click', hidePopUpNav);
  }, [show]);

  return (
    <>
      <nav className="flex flex-row items-center justify-between p-5">
        <Link to="/" className="font-bold text-[4vh] cursor-pointer">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>

        <div className="hidden lg:flex flex-row gap-9 items-center justify-between">
          <Link
            to="/"
            className={`${location.pathname === '/' && 'text-red-500'}`}>
            Home
          </Link>
          <Link
            to="/rentals"
            className={`${location.pathname === '/rentals' && 'text-red-500'}`}>
            Rentals
          </Link>
          <Link
            to="/categories"
            className={`${
              location.pathname === '/categories' && 'text-red-500'
            }`}>
            Categories
          </Link>
          <Link
            to="/about"
            className={`${location.pathname === '/about' && 'text-red-500'}`}>
            About Me
          </Link>
          <Link
            to="/contact"
            className={`${location.pathname === '/contact' && 'text-red-500'}`}>
            Contact
          </Link>
        </div>

        <div className="burger flex flex-row gap-4 items-center justify-between">
          <FontAwesomeIcon
            icon={faBars}
            className="h-6 lg:hidden"
            onClick={togglePopUpNav}
          />

          {!response ? (
            <Link
              to="/auth"
              className="user hidden lg:flex flex-row items-center justify-between gap-3 text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="" />
              &nbsp;Sign in
            </Link>
          ) : (
            <Link
              to="/profile"
              className="user hidden lg:flex flex-row items-center justify-between gap-3 text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="" />
              &nbsp;Profile
            </Link>
          )}

          <Link
            to={response ? '/postlisting' : '/auth'}
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-4 rounded-[5vh] cursor-pointer">
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Post Listing
          </Link>
        </div>
      </nav>
      {show && <PopUpNav />}
    </>
  );
}
