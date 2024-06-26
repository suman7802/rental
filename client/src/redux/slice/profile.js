import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AxiosInstance from '../AxiosInstance';

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.put('/user/update', data, {
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 0,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const reqVerify = createAsyncThunk(
  'profile/reqVerify',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.put('/user/verify', data, {
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 0,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCode = action.meta.requestStatus;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(reqVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(reqVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCode = action.meta.requestStatus;
      })
      .addCase(reqVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
