import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AxiosInstance from '../AxiosInstance';

export const myUnit = createAsyncThunk(
  'profile/myUnit',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get('/unit/myunit');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.put('/user/update', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  unit: [],
  loading: false,
  error: null,
};

export const unitSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(myUnit.fulfilled, (state, action) => {
        state.unit = action.payload;
        state.loading = false;
      })
      .addCase(myUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unitSlice.reducer;
