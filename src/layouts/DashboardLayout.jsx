// DashboardLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../constants/routes.js";
import SideBar from "@/components/dashboard/SideBar.jsx";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to={LOGIN_ROUTE} replace />;

  return (
    <div className="flex max-h-screen">
      <aside className="w-64 shrink-0 bg-white border-r shadow-xl flex flex-col">
        <SideBar />
      </aside>
      {user.roles.includes("Recruiter") ? (
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50">
          <Outlet />
        </main>
      ) : (
        /* Send Seekers to Home, not Login, to avoid UnauthLayout loops */
        <Navigate to="/" replace />
      )}
    </div>
  );
};

export default DashboardLayout;
