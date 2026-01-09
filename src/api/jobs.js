import axios from "axios";

const authToken = localStorage.getItem("authToken");

const baseUrl = import.meta.env.VITE_API_URL;

const getJobs = async () => {
  const response = await axios.get(`${baseUrl}/api/jobs`);
  // console.log("Bacekedn", response.data);
  return response;
};

const getJobById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/jobs/${id}`);
  //  console.log("Job Details:", response.data);
  return response;
};

const editJob = async (id, data) => {
  // console.log("Apply Api=>>", authToken);
  const response = await axios.put(
    `${baseUrl}/api/jobs/${id}`,
    { data },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response;
};

const addJob = async (data) => {
  const response = await axios.post(`${baseUrl}/api/jobs`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  // console.log("Apply Api=>>", response.data);
  return response;
};

export { getJobs, getJobById, editJob, addJob };
