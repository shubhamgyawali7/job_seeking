import { HOME_ROUTE } from "@/constants/routes";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnauthLayout = () => {
  const { user } = useSelector((state) => state.auth);
//   console.log("USER=>",user);
  return (
    <>
      {user ?  <Navigate to={HOME_ROUTE} /> : <Outlet/> }
    </>
  );
};

export default UnauthLayout;
