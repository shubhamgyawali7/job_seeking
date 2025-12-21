import axios from "axios";

// const baseUrl = " https://jobportal-backend-sigma.vercel.app";
const baseUrl = " http://localhost:5001";

const login = async ({ email, password }) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, {
    email,
    password,
  });

  // console.log("Bacekedn", response.data);
  // console.log("Login:=>", response);
  return response;
};

const register = async ({
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  roles,
}) => {
  console.log("name:", `${firstname} ${lastname}`);
  const response = await axios.post(`${baseUrl}/api/auth/register`, {
    name: `${firstname} ${lastname}`,
    email,
    password,
    confirmPassword,
    roles,
  });
  // console.log("Bacekedn", response.data);
  // console.log("Login:=>", response);
  return response;
};

export { login, register };
