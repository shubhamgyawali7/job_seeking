import axios from "axios";
import { data } from "react-router-dom";

const authToken = localStorage.getItem("authToken");

// const baseUrl = " https://jobportal-backend-sigma.vercel.app";
const baseUrl = import.meta.env.VITE_API_URL;

const addedJobs = async () => {
  const response = await axios.get(`${baseUrl}/api/dashboard/added/jobs`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response;
};

const getAddedJobsApplicants = async () => {
  const respone = await axios.get(
    `${baseUrl}/api/dashboard/added/jobs/applicants`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return respone;
};

const updateStatus = async (id, status) => {
  const response = await axios.put(
    `${baseUrl}/api/dashboard/applicants/status/${id}`,
    {
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response;
};

export { addedJobs, getAddedJobsApplicants, updateStatus };
