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
  },
});

export default unitSlice.reducer;
