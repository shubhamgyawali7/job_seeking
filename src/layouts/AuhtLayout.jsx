// AuhtLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../constants/routes.js";

const AuhtLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  // If user is a Seeker, let them through.
  // If they are a Recruiter, don't send them to login (loop!), send them to dashboard.
  if (user.roles.includes("Seeker")) {
    return <Outlet />;
  } else {
    return <Navigate to={DASHBOARD_ROUTE} replace />;
  }
};

export default AuhtLayout;
