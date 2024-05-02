import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AxiosInstance from '../AxiosInstance';
import AccessToken from '../../utils/AccessToken';
import RefreshToken from '../../utils/RefreshToken';
import {
  signInWithGoogle,
  signInWithFacebook,
} from '../../services/auth.service';

const initialState = {
  email: '',
  password: '',
  isLoading: false,
  isError: false,
  status: null,
  response: null,
};

/**
 *
 *
 * -----------------------------
 *  signUp via email and password
 *  ----------------------------
 */
export const signUp = createAsyncThunk('auth/signUp', async (_, {getState}) => {
  const {email, password} = getState().auth;

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/auth/signup',
    headers: {'Content-Type': 'application/json'},
    data: {email, password},
  };

  const response = await AxiosInstance(config);
  return response.data;
});

/**
 *
 *
 * -----------------------------
 *  signIn via email and password
 *  ----------------------------
 */
export const signIn = createAsyncThunk('auth/signIn', async (_, {getState}) => {
  const {email, password} = getState().auth;

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/auth/signin',
    headers: {'Content-Type': 'application/json'},
    data: {email, password},
  };

  const response = await AxiosInstance(config);
  return response.data;
});

/**
 *
 *
 * -----------------------------
 *  signIn via Google
 *  ----------------------------
 */
export const signInWithGoogleThunk = createAsyncThunk(
  'auth/signInWithGoogle',
  async () => {
    const {accessToken, user} = await signInWithGoogle();
    return {accessToken, user};
  }
);

/**
 *
 *
 * -----------------------------
 *  signIn via Facebook
 *  ----------------------------
 */
export const signInWithFacebookThunk = createAsyncThunk(
  'auth/signInWithFacebook',
  async () => {
    const {accessToken, user} = await signInWithFacebook();
    return {accessToken, user};
  }
);

/**
 *
 *
 *
 *
 *  Slice
 *  ----
 *  This section contains the Redux slice for authentication.
 *  It includes actions for signing in and signing up, as well as the initial state and reducers.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },

  extraReducers: (builder) => {
    // SignUp via email and password
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload.data;
      state.status = action.payload.message;

      AccessToken.store(state.response.accessToken);
      RefreshToken.store(state.response.refreshToken);

      state.email = '';
      state.password = '';
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      const error = action.error.message || action.error;
      state.status = error.length < 50 ? error : 'Something went wrong';

      if (navigator.vibrate) navigator.vibrate(200);
    });

    // Sign In via email and password
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.response = action.payload.data;

      AccessToken.store(state.response.accessToken);
      RefreshToken.store(state.response.refreshToken);

      state.email = '';
      state.password = '';
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      const error = action.error.message || action.error;
      state.status = error.length < 50 ? error : 'Something went wrong';

      if (navigator.vibrate) navigator.vibrate(200);
    });

    // Sign In with Google
    builder.addCase(signInWithGoogleThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signInWithGoogleThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = 'Sign in successful';
      state.response = action.payload;

      AccessToken.store(state.response.accessToken);
      RefreshToken.store(state.response.refreshToken);
    });

    builder.addCase(signInWithGoogleThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      const error = action.error.message || action.error;
      state.status = error.length < 50 ? error : 'Something went wrong';

      if (navigator.vibrate) navigator.vibrate(200);
    });
  },
});

export const {setEmail, setPassword} = authSlice.actions;
export default authSlice.reducer;
