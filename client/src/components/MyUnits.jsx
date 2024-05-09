import PropTypes from 'prop-types';

export default function MyUnits({
  propertyImage,
  forRent = 'rent',
  rentPrice,
  rentCurrency = 'npr',
  rentPeriod = 'month',
  propertyName,
  propertyLocation,
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
          <div className="nameAddress capitalize font-semibold">
            {propertyName}
          </div>
          <span className="text-sm">in</span>
          <div className="text-sm">{propertyLocation || 'Kathmandu'}</div>
        </div>
      </div>
    </div>
  );
}

MyUnits.propTypes = {
  propertyImage: PropTypes.string.isRequired,
  forRent: PropTypes.string,
  rentPrice: PropTypes.number.isRequired,
  rentCurrency: PropTypes.string,
  rentPeriod: PropTypes.string,
  propertyName: PropTypes.string.isRequired,
  propertyLocation: PropTypes.string,
};
