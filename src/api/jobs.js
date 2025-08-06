import axios from "axios";

const baseUrl = " https://jobportal-backend-sigma.vercel.app";


const getJobs = async () => {
  const response = await axios.get(`${baseUrl}/api/jobs`);
  // console.log("Bacekedn", response.data);
  return response;
};

const getJobById = async (id) =>{
  const response = await axios.get(`${baseUrl}/api/jobs/${id}`);
  //  console.log("Job Details:", response.data);
  return response;
}



export { getJobs,getJobById};
