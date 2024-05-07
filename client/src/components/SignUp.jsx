import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import {signUp} from '../redux/slice/auth';
import {setEmail, setPassword} from '../redux/slice/auth';

export default function SignUp() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const {isLoading, status, isError, email, password} = useSelector(
    (state) => state.auth
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUp());
  }

  function togglePassword(e) {
    e.preventDefault();
    setShow((show) => !show);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-xs  rounded-xl p-6 shadow-md m-5">
        <div className="text-center font-black text-3xl text-red-600">
          Join us!
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            required
            className="w-full border-none p-4 rounded-xl mt-4 shadow-md outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
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
          <button
            className="block w-full font-bold bg-gradient-to-r from-red-600 to-red-500 text-white py-3 mt-5 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            type="submit"
            disabled={isLoading}>
            Sign Up
          </button>

          {!isLoading && !isError && status && (
            <span className="block text-sm text-center mt-2 text-green-400">
              Account created successfully
            </span>
          )}

          {!isLoading && isError && status && (
            <span className="block text-sm text-center mt-2 text-red-400">
              {status}
            </span>
          )}
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
