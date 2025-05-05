import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from "../../config";
import axios from 'axios';

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/skills?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch skills');
    }
  }
);
const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload?.data || [];
        state.error = null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const getAllSkills = (state) => state.skills?.skills || [];
export default skillsSlice.reducer;