import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../config';

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Token is invalid')
    }

    return { user: data, token };
  } catch (error) {
    localStorage.removeItem('token');
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/local`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: credentials.identifier,
        password: credentials.password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/local/register`, userData);
        if (!response || !response.data) {
          throw new Error('No data in response');
        }
      const { user } = response.data;
      return { user };
    } catch (error) {
      console.error('Register API Error:', {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.message || 'Failed to send reset password email');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

 
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({
  code, password, passwordConfirmation
}, {rejectWithValue}) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('Reset password request failed with response:', data);
      return rejectWithValue(data.message || 'Failed to reset password');
    }
    return data;
  } catch (error) {
    console.log('Reset password request failed with error:', error.message);
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token') ,
  },
  reducers: {
    logoutUser(state) {
      console.log('Logging out, clearing state and localStorage/sessionStorage');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      console.log('After logout, token in localStorage:', localStorage.getItem('token'));
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload || 'Failed to authenticate';
    })  
 
    .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login fulfilled, setting isAuthenticated to true');
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('token', action.payload.jwt); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      })
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});

export const { logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;