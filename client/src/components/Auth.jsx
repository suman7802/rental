import {useRef, useState} from 'react';

export default function Auth() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({email: ''});

  const handleChange = ({target: {name, value}}) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  console.log(form);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 lg:w-[35%]`}>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        value={form.name}
        onChange={handleChange}
        className={`px-5 py-2 text-gray-500 outline-none border border-red-500 rounded-xl`}
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 bg-red-500 rounded-xl text-white hover:bg-red-600`}>
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </form>
  );
}
