import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User logged in:", formData);
    // Your login logic here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: "linear-gradient(135deg, #174a83 0%, #ffffff 50%, #883139 100%)",
      }}
    >
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-[#174a83] text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#174a83", color: "#174a83" }}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#174a83", color: "#174a83" }}
            required
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg transition duration-300"
            style={{ backgroundColor: "#883139" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#174a83")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#883139")}
          >
            Log In
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

export default Login; 
