import Hero from '../sections/Hero';
import Browser from '../sections/Browser';
import Stats from '../sections/Stats';
import FeaturedListing from '../sections/FeaturedListing';
import Properties from '../sections/Properties';
import FeaturedLocations from '../FeaturedLocations';

export default function Home() {
  return (
    <>
      <Hero />
      <Browser />
      <FeaturedListing />
      <Properties />
      <Stats />
      <FeaturedLocations />
    </>
  );
}
