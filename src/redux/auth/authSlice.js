import { createSlice } from "@reduxjs/toolkit";
import { loginUser, regisetrUser } from "./authActions";

const auhtSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    //     // setUser(state, action) {
    //     //   state.user = action.payload;
    //     // },
    logout(state) {
      state.user = null;
      console.log("Logout", state.user);
    },
  },
  extraReducers: (builder) => {
    //pending, fullfilled, rejected
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(regisetrUser.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(regisetrUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(regisetrUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// export const { setUser } = auhtSlice.actions;
export const { logout } = auhtSlice.actions;
export default auhtSlice.reducer;
