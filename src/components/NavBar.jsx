import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, User } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CampusEye
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-sm">
          <NavLink to="/">Home</NavLink>
          {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
          {isLoggedIn && <NavLink to="/realtime">Live Analysis</NavLink>}
          {isLoggedIn && <NavLink to="/videoanalysis">Video Analysis</NavLink>}
        </nav>

        {/* Right side */}
        <div className="flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none"
              >
                Login
              </Link>
              <button
                onClick={() => navigate("/email-verification")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition text-sm focus:outline-none"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white hover:scale-105 transition focus:outline-none">
                <User className="w-5 h-5" />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600 focus:outline-none"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white focus:outline-none"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Reusable NavLink component with single underline on hover
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative text-gray-300 hover:text-white transition-colors focus:outline-none after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
    >
      {children}
    </Link>
  );
};

export default NavBar;
