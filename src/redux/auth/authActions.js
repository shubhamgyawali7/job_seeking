import { login, register } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      localStorage.setItem("authToken", response.data.token);
      return response.data; // { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response.data; // no auto-login
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  },
);
