import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "@/redux/auth/authActions";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading,  error } = useSelector(
    (state) => state.auth
  );
  function handleLogin(data) {
    console.log("LOgin Role:", data);
    dispatch(loginUser(data));
  }

  // useEffect(() => {
  //   if (isAuthenticated && user?.roles?.includes("Recruiter")) {
  //     navigate("/dashboard");
  //   }
  //   if (isAuthenticated && user?.roles?.includes("Seeker")) {
  //     navigate("/user/dashboard");
  //   }
  // }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-white to-red-900 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 border border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 border border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-lg transition"
          >
            {loading ? (
              <Spinner variant="ellipsis" className="mx-auto" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-900 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
