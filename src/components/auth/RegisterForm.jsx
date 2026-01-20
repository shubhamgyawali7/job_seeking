import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "@/redux/auth/authActions";
// import Roles from "@/pages/auth/Roles";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import RoleOptionCard from "./RoleOptionCard";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { loading, error } = useSelector((state) => state.auth);

  const [showRoles, setShowRoles] = useState(false);
  const [formData, setFormData] = useState({});

  const password = watch("password");

  // STEP 1: submit form → open role modal
  function handleRegister(data) {
    setFormData(data); // includes confirmPassword
    setShowRoles(true);
  }

  // STEP 2: role selected → send ALL data to backend

  async function handleRoleSelected(role) {
    const finalData = {
      ...formData,
      roles: [role],
    };

    try {
      await dispatch(registerUser(finalData)).unwrap();
      setShowRoles(false);
      navigate("/login"); 
    } catch (err) {
      setShowRoles(false);
      console.error("Registration failed:", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error.message || error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <div className="flex gap-4">
            <input
              {...register("firstname", { required: "First name required" })}
              placeholder="First Name"
              className="w-1/2 border px-4 py-2 rounded-lg"
            />
            <input
              {...register("lastname", { required: "Last name required" })}
              placeholder="Last Name"
              className="w-1/2 border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <input
            {...register("email", { required: "Email required" })}
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <input
            {...register("confirmPassword", {
              required: "Confirm Password required",
              validate: (value) =>
                value === password || "Confirm Password doesn't match",
            })}
            type="password"
            placeholder="Confirm Password"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-lg transition"
          >
            {loading ? <Spinner className="mx-auto" /> : "Continue"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-900 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* ROLE MODAL */}
      {showRoles && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-xl w-full">
            <RoleOptionCard onRoleSelected={handleRoleSelected} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
