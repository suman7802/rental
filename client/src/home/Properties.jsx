import {useEffect} from 'react';
import Card from '../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import SimpleButton from '../components/SimpleButtons';

import {publicUnit} from '../redux/slice/unit';

export default function Properties() {
  const dispatch = useDispatch();

  const {unit, loading} = useSelector((state) => state.unit); //error

  useEffect(() => {
    dispatch(publicUnit());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5">
        {!loading &&
          unit.map((property, index) => (
            <Card
              key={index}
              id={property.id}
              propertyImage={property.Media[0].url}
              rentPrice={property.rent}
              propertyName={property.title}
              propertyLocation={`${property.latitude}, ${property.longitude}`}
              profileImage={property.User.profile}
              ownerName={property.User.name}
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
