import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';

import logo from '../assets/Rental.png';
import SocialButton from './SocialButton';

const socialButtons = [
  {
    icon: faFacebookF,
    url: 'https://www.facebook.com',
  },
  {
    icon: faInstagram,
    url: 'https://www.instagram.com',
  },
  {
    icon: faLinkedinIn,
    url: 'https://www.linkedin.com',
  },
];

const featuredLocations = [
  {
    name: 'New York',
  },
  {
    name: 'Los Angeles',
  },
  {
    name: 'San Francisco',
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-300 p-5 flex flex-col gap-10 w-screen md:flex-row justify-around">
      <div className="logo flex flex-col gap-5 items-start justify-center lg:w-[20%]">
        <Link to="/" className="font-bold text-[4vh] cursor-pointer">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
        <span className="font-thin text-base leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          suscipit sit earum.
        </span>
        <div className="social flex flex-row gap-3">
          {socialButtons.map((button, index) => (
            <SocialButton key={index} icon={button.icon} url={button.url} />
          ))}
        </div>
      </div>

      <div className="nav flex flex-col md:flex-row gap-10">
        <div className="navigation flex flex-col gap-5 text-base">
          <span className="text-red-500 font-bold text-lg">Navigation</span>
          <Link className="cursor-pointer" to="/">
            Home
          </Link>
          <Link className="cursor-pointer" to="/rentals">
            Rentals
          </Link>
          <Link className="cursor-pointer" to="/categories">
            Categories
          </Link>
          <Link className="cursor-pointer" to="/contact">
            Contact
          </Link>
          <Link className="cursor-pointer" to="/about">
            About Us
          </Link>
        </div>

        <div className="featuredLocation flex flex-col gap-5 text-base">
          <span className="text-red-500 font-bold text-lg">
            Featured Location
          </span>
          {featuredLocations.map((location, index) => (
            <Link
              className="cursor-pointer"
              key={index}
              to={`/location/${location.name}`}>
              {location.name}
            </Link>
          ))}
        </div>

        <div className="help flex flex-col gap-5 text-base">
          <span className="text-red-500 font-bold text-lg">Help</span>
          <Link className="cursor-pointer" to="/help/faq">
            FAQ
          </Link>
          <Link className="cursor-pointer" to="/help/contact">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="subscribe">
        <div className="newsList flex flex-col gap-5 text-base">
          <span className="text-red-500 font-bold text-lg">
            Subscribe to Our Newsletter
          </span>
          <span className="cursor-pointer" to="/help/faq">
            Stay updated with the latest listings and rental tips.
          </span>
          <input
            type="text"
            placeholder="Email Address"
            className="border px-5 bg-transparent outline-none border-gray-400 rounded-[5vh] h-10"
          />
          <button className="border px-5 bg-red-500 rounded-[5vh] h-10">
            <span className="text-white">Subscribe</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
