import Card from '../components/Card';
import SimpleButton from '../components/SimpleButtons';

const properties = [
  {
    propertyImage:
      'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg',
    forRent: 'Rent',
    rentPrice: '85,000',
    rentCurrency: 'NPR',
    rentPeriod: 'Month',
    propertyName: 'Luxury Villa',
    propertyLocation: 'Kathmandu',
    bedrooms: '3',
    bathrooms: '2',
    squareFeet: '25000',
    profileImage:
      'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg',
    ownerName: 'Suman Sharma',
    fev: true,
    url: 'property/luxury-villa',
  },
];

export default function Properties() {
  return (
    <>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5">
        {properties.map((property, index) => (
          <Card
            key={index}
            propertyImage={property.propertyImage}
            forRent={property.forRent}
            rentPrice={property.rentPrice}
            rentCurrency={property.rentCurrency}
            rentPeriod={property.rentPeriod}
            propertyName={property.propertyName}
            propertyLocation={property.propertyLocation}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFeet={property.squareFeet}
            profileImage={property.profileImage}
            ownerName={property.ownerName}
            fev={property.fev}
            url={property.url}
          />
        ))}
      </div>
      <div className="lodeSection w-full flex items-center justify-center my-5">
        <SimpleButton text={'Lode More'} fev={false} />
      </div>
    </>
  );
}
