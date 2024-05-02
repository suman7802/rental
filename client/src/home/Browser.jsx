import CustomButton from '../components/CustomButton';
import {
  faThumbsUp,
  faHouse,
  faCompass,
  faDollarSign,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

const buttons = [
  {
    bgClass: 'bg-purple-200',
    icon: faCompass,
    textColor: 'text-purple-500',
    text: 'Event',
    url: '/event',
  },
  {
    bgClass: 'bg-red-200',
    icon: faThumbsUp,
    textColor: 'text-red-500',
    text: 'Holiday',
    url: '/holiday',
  },
  {
    bgClass: 'bg-green-200',
    icon: faHouse,
    textColor: 'text-green-500',
    text: 'Residential',
    url: '/residential',
  },
  {
    bgClass: 'bg-blue-200',
    icon: faDollarSign,
    textColor: 'text-blue-500',
    text: 'Commercial',
    url: '/commercial',
  },
  {
    bgClass: 'bg-orange-200',
    icon: faEllipsisVertical,
    textColor: 'text-orange-500',
    text: 'More',
    url: '/more',
  },
];

export default function Browser() {
  return (
    <div className="browser flex flex-col text-center items-center gap-5 lg:gap-10 my-10">
      <h2 className="text-xl font-semibold lg:text-4xl">
        Browser From Top Categories
      </h2>

      <div className="divider flex flex-row gap-1">
        <div className="divider flex flex-row w-11 bg-red-500 h-1 rounded-md" />
        <div className="divider flex flex-row w-3 bg-red-500 h-1 rounded-md" />
      </div>

      <div className="buttons flex flex-wrap flex-col items-center justify-around md:flex-row gap-3">
        {buttons.map((button, index) => (
          <CustomButton
            key={index}
            bgClass={button.bgClass}
            icon={button.icon}
            textColor={button.textColor}
            text={button.text}
            url={button.url}
          />
        ))}
      </div>
    </div>
  );
}
