import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from "../../config";

// Асинхронный thunk через fetch
export const sendHelpRequest = createAsyncThunk(
  'helpRequest/sendHelpRequest',
  async ({ email, message }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            email,
            message,
          },
        }),
      });

      // Проверка успешного ответа
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || 'Server error');
      }

      // Если всё в порядке, возвращаем ответ
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Server error');
    }
  }
);

const helpRequestSlice = createSlice({
  name: 'helpRequest',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetHelpRequestState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendHelpRequest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendHelpRequest.fulfilled, (state) => {

        state.loading = false;
        state.success = true;
      })
      .addCase(sendHelpRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetHelpRequestState } = helpRequestSlice.actions;

export default helpRequestSlice.reducer;
