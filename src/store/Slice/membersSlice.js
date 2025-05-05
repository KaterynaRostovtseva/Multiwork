import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';

export const fetchMembersByProject = createAsyncThunk(
  'members/fetchByProject',
  async (projectId) => {
    const response = await axios.get(
      `${API_URL}/members?filters[project][id][$eq]=${projectId}&populate=avatar,skill`
    );
    return response.data.data;
  }
);

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembersByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMembersByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export default membersSlice.reducer;