import registerbg from "../../../assets/images/register-bg.jpg";

const Register = () => {
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

        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border-2 border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-20 text-blue-900 placeholder-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg transition duration-300 font-semibold bg-red-900 hover:bg-blue-900 hover:shadow-lg transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-red-900 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-900 hover:underline font-semibold hover:text-blue-700 transition duration-200"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
