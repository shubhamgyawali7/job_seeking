import React from "react";
import SideBar from "../components/dashboard/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <SideBar />
    <div className="flex-1 bg-gray-50">
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
