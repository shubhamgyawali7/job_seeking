import { createAsyncThunk } from "@reduxjs/toolkit";
import { addedJobs } from "@/api/dashboard";

const recruterAddedJobs = createAsyncThunk("added/jobs", async () => {
  try {
    const response = await addedJobs();
    // console.log("Thunk Dashboard=>", response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export { recruterAddedJobs };
