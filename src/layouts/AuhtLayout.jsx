// AuhtLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../constants/routes.js";

const AuhtLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  console.log("Roles of AuthLayout=>", user.roles[0]);

  return (
    <>
      {user.roles[0] === "Seeker" ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />}
      {/* <Navigate to={LOGIN_ROUTE} /> */}
    </>
  );
};

export default AuhtLayout;
