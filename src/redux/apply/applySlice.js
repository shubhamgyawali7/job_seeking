import { createSlice } from "@reduxjs/toolkit";
import { userAppliedJobs } from "./applyAction";

const applySlice = createSlice({
  name: "applied",
  initialState: {
    jobs: null,
    loading: false,
    error: null,
  },
  reducers: {
    // appliedJobs(state, action) {
    //   state.user = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAppliedJobs.pending, (state, action) => {
        state.loading = true;
        state.jobs = null;
        state.error = null;
      })
      .addCase(userAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        // console.log("Slice=>",action.payload);
        state.error = null;
      })
      .addCase(userAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = null;
        state.error = action.payload;
      });
  },
});

// export const { appliedJobs } = applySlice.actions;
export default applySlice.reducer;
