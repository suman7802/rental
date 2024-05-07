import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function PopUpNav() {
  const {response} = useSelector((state) => state.auth);

  return (
    <div className="popup-nav z-10 absolute inset-x-0 flex flex-col gap-5 py-5 justify-center items-center text-white bg-red-500 rounded-b-xl lg:hidden">
      <Link to="/" className={`${location.pathname === '/' && 'text-black'}`}>
        Home
      </Link>
      <Link
        to="/rentals"
        className={`${location.pathname === '/rentals' && 'text-black'}`}>
        Rentals
      </Link>
      <Link
        to="/categories"
        className={`${location.pathname === '/categories' && 'text-black'}`}>
        Categories
      </Link>
      <Link
        to="/about"
        className={`${location.pathname === '/about' && 'text-black'}`}>
        About Me
      </Link>
      <Link
        to="/contact"
        className={`${location.pathname === '/contact' && 'text-black'}`}>
        Contact
      </Link>

      <Link
        to={response ? '/postlisting' : '/auth'}
        className={`${location.pathname === '/auth' && 'text-black'}`}>
        {response ? 'Profile' : 'Sign In'}
      </Link>
    </div>
  );
}
