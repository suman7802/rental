import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import {useDispatch} from 'react-redux';
import {createUnit} from '../redux/slice/unit';
import {useRef, useState, useEffect} from 'react';

const libraries = ['places'];

export default function PostListing() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [searchBox, setSearchBox] = useState(null);
  const [location, setLocation] = useState({lat: 0, lng: 0});
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const onPlacesChanged = () => {
    setLocation({
      lat: searchBox.getPlaces()[0].geometry.location.lat(),
      lng: searchBox.getPlaces()[0].geometry.location.lng(),
    });
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    formData.append('latitude', location.lat);
    formData.append('longitude', location.lng);
    const data = Object.fromEntries(formData.entries());
    dispatch(createUnit(data));
  };

  return (
    <div className="postListing pt-32 min-h-screen flex flex-row justify-center">
      <form
        ref={formRef}
        className="w-[90vw] h-fit md:w-[40vw] bg-[#D1D5DA] p-5 rounded-lg mb-24 flex flex-col gap-5"
        onSubmit={handleSubmit}>
        <h1 className="text-2xl text-center text-[#43474e] font-bold">
          Post Listing
        </h1>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="rounded-md py-2 pl-4 outline-none"
        />

        <textarea
          name="description"
          id="description"
          placeholder="Description"
          className="rounded-md py-2 pl-4 outline-none"
        />

        <input
          type="number"
          name="rent"
          id="rent"
          placeholder="Rent"
          className="rounded-md py-2 pl-4 outline-none"
        />

        <div className="map">
          {loadError ? (
            <p>Error loading maps</p>
          ) : !isLoaded ? (
            <p>Loading Maps...</p>
          ) : (
            <>
              <StandaloneSearchBox
                onLoad={(ref) => setSearchBox(ref)}
                onPlacesChanged={onPlacesChanged}>
                <input
                  type="text"
                  placeholder="Search location"
                  className="rounded-md pl-4 mb-3"
                />
              </StandaloneSearchBox>
              <GoogleMap
                id="map"
                mapContainerStyle={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '5px',
                }}
                zoom={8}
                center={location}
                onClick={handleMapClick}>
                <Marker position={location} />
              </GoogleMap>
            </>
          )}
        </div>

        <select
          name="category"
          id="category"
          className="rounded-md py-2 pl-4 outline-none">
          <option value="place">Place</option>
          <option value="ride">Ride</option>
          <option value="thing">Thing</option>
        </select>

        <input type="file" name="units" id="units" className="w-min" multiple />

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 mt-1">
          Submit
        </button>
      </form>
    </div>
  );
}
