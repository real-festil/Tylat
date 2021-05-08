/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const authSlice = createSlice({
  name: `auth`,
  initialState: {
    phoneNumber: null as null | string,
  },
  reducers: {
    setUser: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { reducer } = authSlice;

export const actions = {
  ...authSlice.actions,
};

export default authSlice.reducer;
