import { login } from "@/api/auth";
import { loginUser } from "@/redux/auth/authActions";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  // register=> get data from user & handleSubmit=> send data taken from user

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
// console.log("LoAD",loading);

  function handleNav(data) {
    dispatch(loginUser(data));
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #174a83 0%, #ffffff 50%, #883139 100%)",
      }}
    >
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-[#174a83] text-center mb-6">
          Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(handleNav)}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg"
            style={{ borderColor: "#174a83", color: "#174a83" }}
            {...register("email")}
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
            style={{ borderColor: "#174a83", color: "#174a83" }}
            {...register("password")}
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
              "LOG IN"
            )}
          </button>
        </form>

        <p className="text-center text-[#883139] text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#174a83] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
