import { createSlice } from "@reduxjs/toolkit";
import { recruterAddedJobs } from "./jobsAction";

const jobsSlice = createSlice({
  name: "recruteAddedJobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recruterAddedJobs.pending, (state, action) => {
        state.loading = true;
        state.jobs = null;
        state.error = null;
      })
      .addCase(recruterAddedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        // console.log("Slice=>", action.payload);
        state.error = null;
      })
      .addCase(recruterAddedJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = null;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
