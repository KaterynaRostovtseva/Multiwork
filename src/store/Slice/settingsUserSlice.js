import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from "../../config";

export const updateSettingsUserInfo = createAsyncThunk(
  'settings/updateSettingsUserInfo',
  async ({ userId, personalInfo, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, personalInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update user information.' });
    }
  }
);

const settingsUserSlice = createSlice({
  name: 'settingsUser',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSettingsUserError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateSettingsUserInfo.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateSettingsUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateSettingsUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearSettingsUserError } = settingsUserSlice.actions;
export default settingsUserSlice.reducer;
