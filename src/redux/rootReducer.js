import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import applyReducer from "./apply/applySlice.js";
import jobsReducer from "./dashboard/jobsSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  applied: applyReducer,
  recruteAddedJobs: jobsReducer,
});

export default rootReducer;
