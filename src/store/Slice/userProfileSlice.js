import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from "../../config";

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log('Токен:', token);
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          'populate[avatar]': '*',
          'populate[skills][populate][icon]': '*',
          'populate[description]': '*',
          'populate[socialMediaLink]': '*',  
          'populate[bannerImage]': '*' 
        },
      });
      console.log('Ответ fetchCurrentUser:', response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    const userId = getState().user.data.id;
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
    activeTab: 'about',
  },
  reducers:{
    setActiveTab(state, action) {
      state.activeTab = action.payload; 
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      
  },
});
export const { setActiveTab } = userProfileSlice.actions;
export default userProfileSlice.reducer;
