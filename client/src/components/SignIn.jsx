import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import googleSvg from '../assets/google.svg';
import facebookSvg from '../assets/facebook.svg';
import {setEmail, setPassword} from '../redux/slice/auth';
import {signIn, google, facebook} from '../redux/slice/auth';

export default function SignIn() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const {isLoading, isError, status, email, password} = useSelector(
    (state) => state.auth
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signIn());
  }

  function togglePassword(e) {
    e.preventDefault();
    setShow((show) => !show);
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="max-w-xs  rounded-xl p-6 shadow-md m-5">
        <div className="text-center font-black text-3xl text-red-600">
          Welcome back
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            required
            className="w-full border-none p-4 rounded-xl mt-4 shadow-md outline-none"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            placeholder="E-mail"
          />
          <div className="relative flex items-center justify-end">
            <input
              required
              className="w-full border-none p-4 rounded-xl mt-4 shadow-md outline-none"
              type={show ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="Password"
            />
            <button
              onClick={togglePassword}
              className={`absolute mt-4 mr-4 text-gray-400 text-base`}>
              {show ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>

          <span className="block mt-2 ml-2">
            <Link to="/auth/reset" className="text-xs text-red-400">
              Forgot Password ?
            </Link>
          </span>

          <button
            disabled={isLoading}
            className="block w-full font-bold bg-gradient-to-r from-red-600 to-red-500 text-white py-3 mt-5 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            type="submit">
            Sign In
          </button>
          {isError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {status || 'An error occurred. Please try again'}
            </p>
          )}
          {!isError && status && (
            <p className="text-green-500 text-sm text-center mt-2">{status}</p>
          )}
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
          <div className="flex justify-center gap-5 mt-4">
            <button
              onClick={() => dispatch(google())}
              className="p-2 rounded-full w-10 h-10 grid place-content-center shadow-md transform transition-all hover:scale-120 active:scale-90 hover:scale-125">
              <img src={googleSvg} alt="google" />
            </button>
            <button
              onClick={() => dispatch(facebook())}
              className="p-2 rounded-full w-10 h-10 grid place-content-center shadow-md transform transition-all hover:scale-120 active:scale-90 hover:scale-125">
              <img src={facebookSvg} alt="facebook" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
