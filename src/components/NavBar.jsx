import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="relative bg-black/40 backdrop-blur-xl border-b border-gray-700/50 top-0 z-50">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition relative group"
          >
            Home
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-white transition relative group"
          >
            Dashboard
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4 text-sm">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white mt-1 transition-colors"
          >
            Login
          </Link>
          <button
            onClick={() => navigate("/email-verification")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
