import { Link } from "react-router-dom";
import registerbg from "../../assets/images/register-bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LOGIN_ROUTE } from "@/constants/routes";
import { regisetrUser } from "@/redux/auth/authActions";
import { useState } from "react";
import Roles from "./Roles";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Spinner from "../Spinner";

const RegisterForm = () => {
  const [RolePopup, setRolePopup] = useState(false);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log("PopUP=>", RolePopup);

  function handleRegister(data) {
    console.log("REGISTER without Role=>", data);
    setFormData(data); // Save form data
    setRolePopup(true); // Show role popup
  }

  function handleSelectedRole(role) {
    const fullData = { ...formData, roles: role }; // Add selected role to form data
    console.log("Dispatching with role:", fullData);

    dispatch(regisetrUser(fullData));
    setRolePopup(false); // Close role popup
    setFormData({}); // Reset form data
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center filter blur-sm -z-10"
        style={{ backgroundImage: `url(${registerbg})` }}
      ></div>

      {/* Form container */}
      <div className="relative z-10 bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-2">
          Join the Career Network
        </h2>
        <p className="text-red-900 text-center mb-6">
          Create your account and land your dream job
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
              {...register("firstname")}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
              {...register("lastname")}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
            {...register("email")}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
            {...register("password")}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
            {...register("confirmPassword")}
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg transition duration-300 bg-[#883139] hover:bg-red-700 cursor-pointer"
          >
            {loading ? (
              <Spinner
                key="ellipsis"
                variant="ellipsis"
                className="w-[350px] text-blue-100"
              />
            ) : (
              "Create Account"
            )}
          </button>
          {RolePopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/20">
              <div className="bg-white/80 border border-white rounded-xl shadow-2xl p-6 w-full relative">
                <Roles onRoleSelected={handleSelectedRole} />
              </div>
            </div>
          )}
        </form>

        <p className="text-center text-red-900 text-sm mt-4">
          Already have an account?{" "}
          <Link to={LOGIN_ROUTE} className="text-[#174a83] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
