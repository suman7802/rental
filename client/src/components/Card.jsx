import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Card({
  id,
  propertyImage,
  forRent = 'rent',
  rentPrice,
  rentCurrency = 'npr',
  rentPeriod = 'month',
  propertyName,
  propertyLocation,
  profileImage,
  ownerName,
  fev = true,
}) {
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const [lat, lng] = propertyLocation.split(',').map(Number);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.results && data.results.length > 0)
          setLocationName(data.results[0].formatted_address);
      })
      .catch((error) => console.error(error));
  }, [propertyLocation]);

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
            to={id}
            className="nameAddress capitalize font-semibold hover:underline hover:cursor-pointer">
            {propertyName}
          </Link>
          <span className="text-sm">in</span>
          <Link
            to={`/location/${locationName}`}
            className="text-sm hover:underline hover:cursor-pointer">
            {locationName || 'unknown'}
          </Link>
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
  id: PropTypes.number.isRequired,
  propertyImage: PropTypes.string.isRequired,
  forRent: PropTypes.string,
  rentPrice: PropTypes.number.isRequired,
  rentCurrency: PropTypes.string,
  rentPeriod: PropTypes.number,
  propertyName: PropTypes.string.isRequired,
  propertyLocation: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  fev: PropTypes.bool,
};
