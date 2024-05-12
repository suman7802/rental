import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AxiosInstance from '../AxiosInstance';

export const getMyUnit = createAsyncThunk(
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

export const createUnit = createAsyncThunk(
  'profile/createUnit',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post('/unit/post', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  unit: [],
  myUnit: [],
  loading: false,
  error: null,
};

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyUnit.fulfilled, (state, action) => {
        state.myUnit = action.payload;
        state.loading = false;
      })
      .addCase(getMyUnit.rejected, (state, action) => {
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

    builder
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.myUnit = action.payload;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unitSlice.reducer;
