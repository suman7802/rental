import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {gsap} from 'gsap';
import {useEffect, useRef} from 'react';

export default function PopUpNav() {
  const {isLoading, response} = useSelector((state) => state.auth);
  const navRef = useRef();

  useEffect(() => {
    gsap.from(navRef.current, {
      duration: 0.5,
      y: '-100%',
      ease: 'power1.out',
    });
  }, []);

  return (
    <div
      ref={navRef}
      className="popup-nav z-10 fixed pt-24 inset-x-0 flex flex-col gap-5 py-5 justify-center items-center text-black bg-[#efefeff4] rounded-b-xl lg:hidden">
      <Link to="/" className={`${location.pathname === '/' && 'text-red-500'}`}>
        Home
      </Link>
      <Link
        to="/rentals"
        className={`${location.pathname === '/rentals' && 'text-red-500'}`}>
        Rentals
      </Link>
      <Link
        to="/categories"
        className={`${location.pathname === '/categories' && 'text-red-500'}`}>
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

      <Link
        to={!isLoading && response ? '/profile' : '/auth'}
        className={`${location.pathname === '/auth' && 'text-red-500'}`}>
        {!isLoading && response ? 'Profile' : 'Sign In'}
      </Link>
    </div>
  );
}
