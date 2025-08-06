import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaPlusCircle, FaUsers, FaSignOutAlt, FaCog } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import {
  APPLICANTS_ROUTE,
  DASHBOARD_ROUTE,
  ADDJOB_ROUTE,
} from "../../constants/routes";

const menu = [
  {
    to: DASHBOARD_ROUTE,
    label: "Dashboard",
    icon: <FaTachometerAlt className="mr-3 text-xl" />,
    end: true,
  },
  {
    to: ADDJOB_ROUTE,
    label: "Add Job",
    icon: <FaPlusCircle className="mr-3 text-xl" />,
    end: true,
  },
  {
    to: APPLICANTS_ROUTE,
    label: "Applicants",
    icon: <FaUsers className="mr-3 text-xl" />,
    end: true,
  },
];

const SideBar = () => {
  return (
    <aside className="w-64 max-h-full bg-white shadow-2xl rounded-r-3xl flex flex-col items-center py-8 border-r-2 border-slate-100">
      {/* Logo Section */}
      <div className="mb-12 flex flex-col items-center">
        <div className="bg-slate-50 rounded-2xl p-4 shadow-lg border border-slate-200">
          <img src={logo} alt="RojgaarHub Logo" className="h-12 w-auto" />
        </div>
        <span className="mt-4 text-xl font-extrabold text-[#164b7d] tracking-wide">
          Admin Panel
        </span>
        <div className="mt-2 w-16 h-0.5 bg-[#8a2f36] rounded-full"></div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3 w-full px-6">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center text-base font-semibold rounded-xl px-4 py-3 transition-all duration-200 relative group border-2 transform hover:scale-105
              ${
                isActive
                  ? "bg-[#8a2f36] text-white shadow-lg border-[#8a2f36] font-bold"
                  : "text-[#164b7d] hover:bg-slate-50 hover:text-[#8a2f36] border-transparent hover:border-slate-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md" />
                )}
                {item.icon}
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Settings Section */}
      <div className="flex-1 flex flex-col justify-end w-full px-6 pb-6">
        <div className="border-t border-slate-200 pt-6 space-y-3">
          <button className="flex items-center text-base font-semibold rounded-xl px-4 py-3 transition-all duration-200 w-full text-[#164b7d] hover:bg-slate-50 hover:text-[#8a2f36] border-2 border-transparent hover:border-slate-200 transform hover:scale-105">
            <FaCog className="mr-3 text-xl" />
            Settings
          </button>
          
          <button className="flex items-center text-base font-semibold rounded-xl px-4 py-3 transition-all duration-200 w-full text-[#164b7d] hover:bg-[#8a2f36] hover:text-white border-2 border-transparent hover:border-[#8a2f36] transform hover:scale-105">
            <FaSignOutAlt className="mr-3 text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-slate-400 tracking-wide text-center">
        <div className="text-[#164b7d] font-semibold">RojgaarHub</div>
        <div className="mt-1">© 2025 Shubham Gyawali</div>
      </div>
    </aside>
  );
};

export default SideBar;