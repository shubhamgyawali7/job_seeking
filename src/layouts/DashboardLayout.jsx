// DashboardLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../constants/routes.js";
import SideBar from "@/components/dashboard/SideBar.jsx";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex max-h-screen">
      <aside
        className="w-64 shrink-0 bg-white border-r shadow-xl
                 flex flex-col" /* ❶ vertical stacking */
      >
        <SideBar />
      </aside>
      {user && (user.roles[0] === "Admin" || user.roles[0] === "Recruter") ? (
        <>
          <main className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50">
            <Outlet />
          </main>
        </>
      ) : (
        <Navigate to={LOGIN_ROUTE} />
      )}
    </div>
  );
};

export default DashboardLayout;
