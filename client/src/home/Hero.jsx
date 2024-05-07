import {
  faLocationDot,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-[url('./assets/hero.png')] h-[80vh] bg-cover py-4 md:py-[20vh]">
      <h1 className="text-4xl font-semibold text-center leading-relaxed mt-20">
        <span className="md:inline block">Discover Your&nbsp;</span>
        <span className="text-red-500 md:inline block">Perfect Rental</span>
      </h1>
      <p className="text-center p-5">
        Rent car, house and Items in Just a Few Clicks
      </p>

      <div className="interaction flex flex-col gap-5 w-screen px-1 md:items-center">
        <div className="buttons flex flex-row items-center justify-around md:justify-center md:gap-5">
          <Link
            to="/place"
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-5 rounded-[5vh]">
            Place
          </Link>
          <Link
            to="/ride"
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-5 rounded-[5vh]">
            Ride
          </Link>
          <Link
            to="/things"
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-5 rounded-[5vh]">
            Things
          </Link>
        </div>

        <div className="search flex flex-col md:hidden gap-3 items-center pb-5">
          <div className="search relative flex flex-col w-[100%] md:w-[80%] xl:w-[70%]">
            <input
              type="text"
              className="bg-white text-gray-400 py-3 px-5 rounded-[5vh] pl-12 xl:pl-14 2xl:pl-16 outline-none"
              placeholder="Search for cars, houses and more.."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-5 top-4 text-gray-400"
            />
          </div>

          <div className="select relative flex flex-col w-[100%] md:w-[80%] xl:w-[70%]">
            <select className="bg-white text-gray-400 py-3 px-5 rounded-[5vh] pl-12 xl:pl-14 2xl:pl-16 outline-none">
              <option value="">Select location</option>
              <option value="kathmandu">Kathmandu</option>
              <option value="lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>

            <FontAwesomeIcon
              icon={faLocationDot}
              className="absolute left-5 top-4 text-gray-400"
            />
          </div>
          <div className="search relative flex flex-col w-[100%] md:w-[80%] xl:w-[70%]">
            <button className="bg-red-500 text-white py-2 px-3 rounded-[5vh]">
              Get Started
            </button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-[30%] top-3 text-white"
            />
          </div>
        </div>

        <div className="search md:flex flex-row gap-4 items-center justify-center bg-white w-fit p-2 hidden rounded-[5vh]">
          <div className="search relative pl-10">
            <input
              type="text"
              className="bg-white text-gray-400 outline-none w-64 xl:w-96 xl:pl-4"
              placeholder="Search for cars, houses and more.."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1 text-gray-400"
            />
          </div>
          <div className="vr h-10 bg-gray-300 w-[1px]" />
          <div className="select relative pl-10">
            <select className="bg-white text-gray-400 w-52 xl:w-64 outline-none xl:pl-4">
              <option value="">Select location</option>
              <option value="kathmandu">Kathmandu</option>
              <option value="lalitpur">Lalitpur</option>
              <option value="bhaktapur">Bhaktapur</option>
            </select>
            <FontAwesomeIcon
              icon={faLocationDot}
              className="absolute left-3 top-1 text-gray-400"
            />
          </div>
          <div className="search relative">
            <button className="bg-red-500 hover:bg-red-600 transition-colors duration-200 p-5 xl:p-7 rounded-[5vh] relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-0 top-0 right-0 bottom-0 m-auto text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
