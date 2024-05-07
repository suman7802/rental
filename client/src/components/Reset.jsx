import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {reset} from '../redux/slice/auth';
import {setEmail} from '../redux/slice/auth';

export default function Reset() {
  const dispatch = useDispatch();
  const {isLoading, status, isError, email} = useSelector(
    (state) => state.auth
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(reset());
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-xs  rounded-xl p-6 shadow-md m-5">
        <div className="text-center font-black text-3xl text-red-600">
          let&apos;s back in!
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

          <button
            className="block w-full font-bold bg-gradient-to-r from-red-600 to-red-500 text-white py-3 mt-5 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            type="submit"
            disabled={isLoading}>
            Reset Password
          </button>

          {!isLoading && !isError && status && (
            <span className="block text-sm text-center mt-2 text-green-400">
              Reset link sent
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
