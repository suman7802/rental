import SimpleButton from '../components/SimpleButtons';

const buttons = [
  {
    text: 'All Items',
    count: 26,
    active: true,
  },
  {
    text: 'Residential Space',
    count: 12,
  },
  {
    text: 'Sports Venues',
    count: 8,
  },
  {
    text: 'Meeting Spaces',
    count: 6,
  },
  {
    text: 'Van & Buses',
  },
  {
    text: 'Car & SUVs',
  },
];

export default function FeaturedListing() {
  return (
    <div className="browser flex flex-col text-center items-center gap-5 lg:gap-10 my-10">
      <h2 className="text-xl lg:text-4xl font-semibold">Featured Listings</h2>

      <div className="divider flex flex-row gap-1">
        <div className="divider flex flex-row w-11 bg-red-500 h-1 rounded-md" />
        <div className="divider flex flex-row w-3 bg-red-500 h-1 rounded-md" />
      </div>

      <div className="buttons w-screen gap-3 flex flex-row overflow-x-auto  no-scrollbar lg:justify-center">
        {buttons.map((button, index) => (
          <SimpleButton
            key={index}
            text={button.text}
            count={button.count}
            active={button.active}
          />
        ))}
      </div>
    </div>
  );
}
