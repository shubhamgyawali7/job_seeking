import { DASHBOARD_ROUTE, HOME_ROUTE } from "@/constants/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnauthLayout = () => {
  const { user } = useSelector((state) => state.auth);

  // Handle array case (from your previous issue) 
  // to extract data if it came in [{ id: 1, name: "John" }] formate
  const currentUser = Array.isArray(user) && user.length > 0 ? user[0] : user;

  if (!currentUser) {
    console.log("No user - showing outlet (login/register)");
    return <Outlet />;
  }


  const redirectPath =
    currentUser.roles[0] === "Admin" || currentUser.roles[0] === "Recruter"
      ? DASHBOARD_ROUTE
      : HOME_ROUTE;

  console.log("User exists - redirecting to:", redirectPath);

  return <Navigate to={redirectPath} replace />;
};

export default UnauthLayout;
