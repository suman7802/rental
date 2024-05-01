import {Link} from 'react-router-dom';

import googleSvg from '../assets/google.svg';
import facebookSvg from '../assets/facebook.svg';
import {signInWithGoogle, signInWithFacebook} from '../services/auth.service';

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="max-w-xs  rounded-xl p-6 shadow-md m-5">
        <div className="text-center font-black text-3xl text-red-600">
          Welcome back
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
          <span className="block mt-2 ml-2">
            <a href="#" className="text-xs text-red-400">
              Forgot Password ?
            </a>
          </span>
          <input
            className="block w-full font-bold bg-gradient-to-r from-red-600 to-red-500 text-white py-3 mt-5 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            type="submit"
            value="Sign In"
          />
        </form>
        <span className="block text-center mt-2">
          <Link to="/auth/signup" className="text-red-400 text-xs">
            Don&apos;t have an account? Sign Up
          </Link>
        </span>
        <div className="mt-6">
          <span className="block text-center text-xs text-gray-400">
            Or Sign in with
          </span>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={signInWithGoogle}
              className="p-2 rounded-full w-10 h-10 grid place-content-center shadow-md transform transition-all hover:scale-120 active:scale-90">
              <img src={googleSvg} alt="google" />
            </button>
            <button
              onClick={signInWithFacebook}
              className="p-2 rounded-full w-10 h-10 grid place-content-center shadow-md transform transition-all hover:scale-120 active:scale-90">
              <img src={facebookSvg} alt="facebook" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
