import {
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  USER_DASHBOARD_ROUTE,
} from "@/constants/routes";
import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import navMenu from "@/constants/navMenu";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";


const user = {
  name: "Ram",
  email: "Ram@email.com",
  photo: "https://i.pravatar.cc/40?img=3",
};

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinkClass = ({ isActive }) => (isActive ? "text-blue-700 " : "");

  const navigate = useNavigate();
  const goToProfile = () => {
    navigate({ pathname: PROFILE_ROUTE });
  };
  const goToDashboard = () => {
    navigate({ pathname: USER_DASHBOARD_ROUTE });
  };

  // const navMenu = [
  //   { label: "Home" },
  //   { label: "Jobs" },
  //   { label: "About" },
  //   { label: "Contact" },
  // ];

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    // console.log("Clisked=>", logout());
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 group">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#873036" }}
              >
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                RojgaarHub
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-1"> */}
          {/* {navMenu.filter((menu) => menu.auth === isAuthenticated) */}
          {/* {navMenu.map((link) => (
              <NavLink
                key={link.label}
                onClick={() => setActiveTab(link.label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === link.label
                    ? "text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={activeTab === link.label ? { backgroundColor: '#164b7d' } : {}}
              >
                {link.label}
              </NavLink>
            ))}
          </div> */}

          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white :bg-gray-800 md::bg-gray-900 :border-gray-700">
            {navMenu.map((menu) => (
              <li key={menu.route}>
                <NavLink to={menu.route} className={navLinkClass}>
                  {menu.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Profile Dropdown */}
          <div className="flex items-center space-x-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img
                  src={user.photo}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={goToProfile}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
                    >
                      <span className="text-gray-600">👤</span>
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={goToDashboard}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
                    >
                      <span className="text-gray-600">📊</span>
                      <span>Dashboard</span>
                    </button>

                    <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full">
                      <span className="text-gray-600">⚙️</span>
                      <span>Settings</span>
                    </button>

                    <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full">
                      <span className="text-gray-600">❓</span>
                      <span>Help & Support</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-200 py-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <span className="text-red-600">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? (
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          className="md:hidden bg-white border-t border-gray-200"
          ref={mobileMenuRef}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                onClick={() => {
                  setActiveTab(link.label);
                  setShowMobileMenu(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  activeTab === link.label
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={
                  activeTab === link.label ? { backgroundColor: "#164b7d" } : {}
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
