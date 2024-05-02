import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';

import {signUp} from '../redux/slice/auth';
import {setEmail, setPassword} from '../redux/slice/auth';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, status, isError, email, password} = useSelector(
    (state) => state.auth
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const resultAction = await dispatch(signUp());
    unwrapResult(resultAction);
    navigate('/');
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="max-w-xs  rounded-xl p-6 shadow-md m-5">
        <div className="text-center font-black text-3xl text-red-600">
          Hi, There
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
          <input
            required
            className="w-full border-none p-4 rounded-xl mt-4 shadow-md outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
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

          {isError && status && (
            <span className="block text-sm text-center mt-2 text-red-400">
              {status || 'Something went wrong'}
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
