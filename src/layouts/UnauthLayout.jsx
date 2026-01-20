import { DASHBOARD_ROUTE } from "@/constants/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnauthLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    // Redirect based on role so they land on a page they are allowed to see
    if (user.roles.includes("Recruiter")) {
      return <Navigate to={DASHBOARD_ROUTE} replace />;
    }
    return <Navigate to="/" replace />; // Home for Seekers
  }

  return <Outlet />;
};

export default UnauthLayout;
