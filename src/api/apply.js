import axios from "axios";

// const baseUrl = " https://jobportal-backend-sigma.vercel.app";
const baseUrl = " http://localhost:5000";

const getOnlyAppliedJobs = async () => {
  const response = await axios.get(`${baseUrl}/api/apply/user/jobs`);
  console.log(response);
//   return response;
};

export default { getOnlyAppliedJobs };
