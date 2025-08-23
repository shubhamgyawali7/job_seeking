import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  DASHBOARD_ROUTE,
  ADDJOB_ROUTE,
  APPLICANTS_ROUTE,
  JOB_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  PROFILE_ROUTE,
  USER_DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "./constants/routes.js";
import Dashboard from "./pages/company/Dashboard.jsx";
import ApplicantList from "./pages/company/ApplicantList.jsx";
import JobList from "./pages/company/job/JobList.jsx";
import AddJob from "./pages/company/job/AddJob.jsx";
import EditJob from "./pages/company/job/EditJob.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import About from "./pages/user/About.jsx";
import Home from "./pages/user/Home.jsx";
import Contact from "./pages/user/Contact.jsx";
import List from "./pages/user/job/List.jsx";
import Detail from "./pages/user/job/Detail.jsx";
import Profile from "./pages/user/auth/Profile.jsx";
import UserDashboard from "./pages/user/auth/Dashboard.jsx";
import Register from "./pages/user/auth/Register.jsx";
import Login from "./pages/user/auth/Login.jsx";
import AuhtLayout from "./layouts/AuhtLayout.jsx";
import UnauthLayout from "./layouts/UnauthLayout.jsx";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* <Route index path="" element={<Header />} /> */}
        <Route path="/" element={<Home />} />
        <Route element={<AuhtLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path={JOB_ROUTE}>
            <Route index element={<List />} />
            <Route path={":id"} element={<Detail />} />
          </Route>

          <Route path={ABOUT_ROUTE} element={<About />} />
          <Route path={CONTACT_ROUTE} element={<Contact />} />
          <Route path={PROFILE_ROUTE} element={<Profile />} />
        </Route>
        <Route element={<UnauthLayout />}>
          <Route>
            <Route path={LOGIN_ROUTE} element={<Login />} />
            <Route path={REGISTER_ROUTE} element={<Register />} />
          </Route>
        </Route>
        <Route path={USER_DASHBOARD_ROUTE} element={<UserDashboard />} />
        <Route element={<DashboardLayout />}>
          <Route index path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path={ADDJOB_ROUTE}>
            <Route index element={<JobList />} />
            <Route path={"add"} element={<AddJob />} />
            <Route path={"edit/:id"} element={<EditJob />} />
          </Route>
          <Route path={APPLICANTS_ROUTE} element={<ApplicantList />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
