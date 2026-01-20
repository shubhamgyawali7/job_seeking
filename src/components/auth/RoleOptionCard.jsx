import { useState } from "react";
import { User, Briefcase } from "lucide-react";

const RoleOptionCard = ({ onRoleSelected }) => {
  const [role, setRole] = useState("");

  const roles = [
    {
      name: "Seeker",
      label: "Job Seeker",
      icon: <User size={40} />,
    },
    {
      name: "Recruiter",
      label: "Recruiter",
      icon: <Briefcase size={40} />,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">
        Choose Your Role
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {roles.map((r) => (
          <div
            key={r.name}
            onClick={() => setRole(r.name)}
            className={`cursor-pointer border rounded-xl p-6 text-center transition
              ${
                role === r.name
                  ? "border-blue-900 bg-blue-50 shadow-xl"
                  : "hover:shadow-md"
              }
            `}
          >
            <div className="flex justify-center mb-4 text-blue-900">
              {r.icon}
            </div>
            <h3 className="text-xl font-semibold">{r.label}</h3>
          </div>
        ))}
      </div>

      <button
        disabled={!role}
        onClick={() => onRoleSelected(role)}
        className={`w-full mt-8 py-3 rounded-lg text-white transition
          ${
            role
              ? "bg-blue-900 hover:bg-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        Continue as {role || "..."}
      </button>
    </div>
  );
};

export default RoleOptionCard;
