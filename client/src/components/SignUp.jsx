import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="max-w-xs  rounded-xl p-6 shadow-md m-5">
        <div className="text-center font-black text-3xl text-red-600">
          Hi, There
        </div>
        <form action="submit" className="mt-5">
          <input
            required
            className="w-full border-none p-4 rounded-xl mt-4 shadow-md outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required
            className="w-full border-none p-4 rounded-xl mt-4 shadow-md outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input
            className="block w-full font-bold bg-gradient-to-r from-red-600 to-red-500 text-white py-3 mt-5 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            type="submit"
            value="Sign Up"
          />
        </form>
        <span className="block text-center mt-2">
          <Link to="/auth" className="text-red-400 text-xs">
            Already have an account? Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}
