import Hero from './Hero';
import Browser from './Browser';
import Stats from './Stats';
import FeaturedListing from './FeaturedListing';
import Properties from './Properties';
import FeaturedLocations from '../components/FeaturedLocations';

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
