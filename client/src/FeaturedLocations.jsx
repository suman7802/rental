import ImageCard from './components/ImageCard';

const locations = [
  {
    propertyImage:
      'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg',
    propertyLocation: 'New York',
    url: 'location/new-york',
  },
];

export default function FeaturedLocations() {
  return (
    <div className="flex flex-col text-center items-center gap-5 my-10">
      <h2 className="text-xl font-semibold lg:text-4xl">Featured Locations</h2>

      <div className="divider flex flex-row gap-1">
        <div className="divider flex flex-row w-11 bg-red-500 h-1 rounded-md" />
        <div className="divider flex flex-row w-3 bg-red-500 h-1 rounded-md" />
      </div>

      <div className="flex flex-col md:flex-row gap-5 overflow-x-scroll max-w-full my-5">
        {locations.map((location, index) => (
          <ImageCard
            key={index}
            propertyImage={location.propertyImage}
            propertyLocation={location.propertyLocation}
            url={location.url}
          />
        ))}
      </div>
    </div>
  );
}
