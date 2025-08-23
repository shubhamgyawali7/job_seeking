import { useState } from "react";
import { User, Briefcase } from "lucide-react";

const Roles = ({ onRoleSelected }) => {
  const [selectRole, setSelectRole] = useState("");
  const [selectBg, setSelectBg] = useState("");

  const roles = [
    {
      label: "Job Seeker",
      description: "Looking for your next opportunity",
      icon: (
        <User
          size={60}
          color="white"
          className="bg-blue-400 p-2 rounded-lg inline-block"
        />
      ),
    },
    {
      label: "Recruiter",
      description: "Find top talent for your roles",
      icon: (
        <Briefcase
          size={60}
          color="white"
          className="bg-red-400 p-2 rounded-lg inline-block"
        />
      ),
    },
  ];

  function handleRoles(role) {
    setSelectRole(role);

    const bgColor = role === "Recruiter" ? "bg-red-400" : "bg-blue-400";
    setSelectBg(bgColor);

    console.log(bgColor === "bg-red-500" ? "RED" : "BLUE");
  }

  function handleContinue() {
    if (selectRole) {
      console.log("Roles Comp=>",selectRole);
      onRoleSelected(selectRole); // ✅ Dispatches registration from parent
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-lg text-gray-600">
            Select how you'd like to use our platform
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => (
            <div
              key={role.label}
              className={`relative cursor-pointer rounded-2xl p-8 hover:shadow-2xl hover:border ${
                selectRole == role.label
                  ? `border-2 border-blue-400 shadow-xl ${selectBg}`
                  : ""
              } `}
              onClick={() => handleRoles(role.label)}
            >
              {/* Selection indicator */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {selectRole === role.label && (
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
              </div>

              {/* Icon */}
              <div
                onClick={() => onRoleSelected(role.label)}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300"
              >
                {role.icon}
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {role.label}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            // disabled={!selectRole}
            onClick={handleContinue}
            className="px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-gray-300 hover:bg-black hover:text-white"
          >
            {selectRole
              ? `Continue as ${selectRole}`
              : "Select a role to continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roles;
