import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {createUnit} from '../redux/slice/unit';

export default function PostListing() {
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    dispatch(createUnit(data));
  };

  return (
    <div className="postListing pt-32 h-screen flex flex-row justify-center items-center">
      <form
        ref={formRef}
        className="w-[90vw] md:w-[40vw] bg-[#D1D5DA] p-5 rounded-lg mb-24 flex flex-col gap-5"
        onSubmit={handleSubmit}>
        <h1 className="text-2xl text-center text-[#43474e] font-bold">
          Post Listing
        </h1>

        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="rounded-md py-2 pl-4 outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="rounded-md py-2 pl-4 outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            className="rounded-md py-2 pl-4 outline-none"
          />
        </div>

        <select
          name="category"
          id="category"
          className="rounded-md py-2 pl-4 outline-none">
          <option value="place">Place</option>
          <option value="ride">Ride</option>
          <option value="thing">Thing</option>
        </select>

        <input type="file" name="image" id="image" className="w-min" />

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 mt-1">
          Submit
        </button>
      </form>
    </div>
  );
}
