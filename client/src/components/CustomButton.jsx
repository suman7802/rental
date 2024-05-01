import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function CustomButton({bgClass, icon, textColor, text, url}) {
  return (
    <Link
      to={url}
      className={`flex flex-row items-center justify-between w-72 lg:w-48 border border-gray-300 text-black py-2 px-3 rounded-[5vh] hover:bg-gray-200 transition-colors duration-200`}>
      <div
        className={`background relative ${bgClass} p-1 h-12 w-14 lg:w-16 lg:h-9 rounded-full`}>
        <FontAwesomeIcon
          icon={icon}
          className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ${textColor}`}
        />
      </div>
      <div className="text w-[calc(18rem-2.25rem)]">
        <span>{text}</span>
      </div>
    </Link>
  );
}

CustomButton.propTypes = {
  bgClass: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  textColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
