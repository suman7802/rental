import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AxiosInstance from '../AxiosInstance';

const initialState = {
  isLoading: false,
  isError: false,
  status: null,
  response: '',
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({email, password}) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/auth/signup',
      headers: {'Content-Type': 'application/json'},
      data: {email, password},
    };

    const response = await AxiosInstance(config);
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({email, password}) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/auth/signin',
      headers: {'Content-Type': 'application/json'},
      data: {email, password},
    };

    const response = await AxiosInstance(config);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    // Sign up
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload.data;
      state.status = action.payload.message;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      const error = action.error.message || action.error;
      const validError = error.length < 50 ? error : 'Something went wrong';
      state.status = validError;
    });

    // Sign in
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.response = action.payload.data;
      console.log('Sign in successful:', action.payload.data);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.error('Sign in error:', action.error.message);
    });
  },
});

export default authSlice.reducer;
