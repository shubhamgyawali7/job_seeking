import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnAppliedJobs } from "@/api/apply";

const userAppliedJobs = createAsyncThunk("applied/userJobs", async () => {
  try {
    const response = await getOwnAppliedJobs();
    // console.log("Thunk Apply=>", response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export { userAppliedJobs };
