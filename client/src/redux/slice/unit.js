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

export const publicUnit = createAsyncThunk(
  'profile/unit',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get('/unit/get');
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
  name: 'unit',
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
      .addCase(publicUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(publicUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.unit = action.payload;
      })
      .addCase(publicUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unitSlice.reducer;
