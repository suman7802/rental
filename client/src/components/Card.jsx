import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Card({
  propertyImage,
  forRent = 'rent',
  rentPrice,
  rentCurrency = 'npr',
  rentPeriod = 'month',
  propertyName,
  propertyLocation,
  bedrooms,
  bathrooms,
  squareFeet,
  profileImage,
  ownerName,
  fev,
  url,
}) {
  return (
    <div className="flex flex-col items-start rounded-lg border border-gray-300 w-fit">
      <div className="relative picture">
        <img
          src={propertyImage}
          alt="property"
          className="w-80 h-60 object-cover rounded-t-lg"
        />
        <span className="absolute capitalize text-sm text-white top-3 right-3 bg-green-600 px-2 rounded-[5vh]">
          For {forRent}
        </span>
      </div>

      <div className="details flex flex-col py-4 gap-2 px-5">
        <div className="price flex flex-row gap-2 items-center">
          <span className="rent uppercase text-red-500">
            {rentPrice} {rentCurrency}
          </span>
          <span className="text-black capitalize text-sm">/{rentPeriod}</span>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <Link
            to={url}
            className="nameAddress capitalize font-semibold hover:underline hover:cursor-pointer">
            {propertyName}
          </Link>
          <span className="text-sm">in</span>
          <Link
            to={`/location/${propertyLocation}`}
            className="text-sm hover:underline hover:cursor-pointer">
            {propertyLocation}
          </Link>
        </div>

        <div className="specs text-xs flex flex-row items-center gap-2 justify-around">
          <span>{bedrooms} Bedrooms</span>
          <div className="space bg-black w-[1.5px] h-5" />
          <span>{bathrooms} Bathrooms</span>
          <div className="space bg-black w-[1.5px] h-5" />
          <span>{squareFeet} SquareFT</span>
        </div>
      </div>

      <div className="profile flex flex-row w-full items-center justify-around py-4 border-t-[1.5px]">
        <div className="profile flex flex-row items-center gap-4">
          <img
            src={profileImage}
            alt="profile"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="info flex flex-col">
            <span className="name text-sm hover:underline hover:cursor-pointer">
              {ownerName}
            </span>
            <span className="text-xs text-gray-600 font-thin">
              Property Owner
            </span>
          </div>
        </div>
        <div className="fev bg-gray-300 px-3 py-2 w-fit h-fit rounded-md group hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-gray-400 group-hover:text-red-600 transition-colors duration-200 ${
              fev ? 'text-red-500' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  propertyImage: PropTypes.string.isRequired,
  forRent: PropTypes.string.isRequired,
  rentPrice: PropTypes.string.isRequired,
  rentCurrency: PropTypes.string.isRequired,
  rentPeriod: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  propertyLocation: PropTypes.string.isRequired,
  bedrooms: PropTypes.string.isRequired,
  bathrooms: PropTypes.string.isRequired,
  squareFeet: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  fev: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};
