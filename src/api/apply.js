import axios from "axios";

const authToken = localStorage.getItem("authToken");

// const baseUrl = " https://jobportal-backend-sigma.vercel.app";
const baseUrl = import.meta.env.VITE_API_URL;


const applyJobs = async(id)=>{
  // console.log("AuthToken=>",authToken);
  const response = await axios.post(`${baseUrl}/api/apply/`,{
      jobId: id 
    },
  {
    headers:{
      Authorization : `Bearer ${authToken}`,
    },
  });
  // console.log(id);
  return response;
}

const getOwnAppliedJobs = async () => {
  const response = await axios.get(`${baseUrl}/api/apply/user/jobs`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  // console.log("Apply Api=>>", response.data);
  return response;
};

export { getOwnAppliedJobs,applyJobs };

// router.post("/",[auth,rolesBasedAuth("Seeker")],applyJobs);
// router.get("/",getAllApplyJobs);
// router.get("/:id",getApplyJobsById);

//  router.get("/user/jobs",[auth,rolesBasedAuth("Seeker")],getOnlyApplyJobs);
