import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function ImageCard({propertyImage, propertyLocation, url}) {
  return (
    <div className="relative min-w-80 cursor-pointer">
      <img
        src={propertyImage}
        alt="property"
        className="min-w-80 h-60 object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black rounded-lg to-transparent opacity-50" />
      <Link to={url} className="absolute text-white bottom-4 left-4">
        {propertyLocation}
      </Link>
    </div>
  );
}

ImageCard.propTypes = {
  propertyImage: PropTypes.string.isRequired,
  propertyLocation: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
