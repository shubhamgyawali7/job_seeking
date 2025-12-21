import { login, register } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk("auth/login", async (data) => {
  // console.log("From Thunk=>",data)
  try {
    const response = await login(data);
    localStorage.setItem("authToken", response.data?.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

const regisetrUser = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await register(data);
    localStorage.setItem("authToken", response.data?.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export { loginUser, regisetrUser };
