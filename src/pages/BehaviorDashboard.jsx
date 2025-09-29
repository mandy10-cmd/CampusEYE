// File: BehaviorDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Camera, AlertTriangle, ShieldAlert, CheckCircle, EyeOff, User, Eye } from 'lucide-react';

const alerts = [
  {
    type: "Ragging Detected",
    desc: "Unusual aggressive behavior between students in Hostel Block A.",
    camera: "Camera 3",
    time: "Just Now",
    status: "Notified",
    level: "high",
  },
  {
    type: "Fighting Detected",
    desc: "Physical altercation detected near the main canteen area.",
    camera: "Camera 1",
    time: "2 mins ago",
    status: "Notified",
    level: "critical",
  },
  {
    type: "Suspicious Behavior",
    desc: "Student detected bypassing access gates.",
    camera: "Camera 2",
    time: "10 mins ago",
    status: "Pending",
    level: "medium",
  },
  {
    type: "All Clear",
    desc: "Normal student behavior in monitored areas.",
    camera: "All Zones",
    time: "9 hours ago",
    status: "N/A",
    level: "safe",
  },
];

const levelStyles = {
  critical: 'bg-red-800/20 border-red-500/50 text-red-400',
  high: 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400',
  medium: 'bg-orange-900/20 border-orange-500/50 text-orange-400',
  safe: 'bg-green-900/20 border-green-500/50 text-green-400',
};

// Navbar Component
const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <header className="bg-black/40 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CampusEye
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-sm">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition relative group"
          >
            Home
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition relative group"
              >
                Dashboard
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
              </Link>

              <Link
                to="/realtime"
                className="text-gray-300 hover:text-white transition relative group"
              >
                Live Analysis
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white mt-1 transition-colors text-sm"
              >
                Login
              </Link>
              <button
                onClick={() => navigate("/email-verification")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition text-sm"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white hover:scale-105 transition">
                <User className="w-5 h-5" />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white"
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

// Main Dashboard Component
const BehaviorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />

      <main className="px-6 py-10 overflow-y-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex gap-3 items-center">
            <ShieldAlert className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Behavioral Monitoring Dashboard
            </h1>
          </div>
          <Link
            to="/"
            className="text-sm text-blue-300 hover:text-white transition px-4 py-2 rounded-md focus:outline-none"
          >
            ⬅ Back to Home
          </Link>
        </header>

        {/* Live Feeds */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-300">Live Campus Feeds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Main Canteen", "Hostel Block A", "Library", "Entrance Gate", "Corridor", "Playground"].map((loc, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 flex flex-col items-center justify-center hover:border-gray-500 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <Camera className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-sm md:text-base text-gray-200 font-medium">{loc}</p>
                <span className="mt-2 text-green-400 text-xs md:text-sm font-medium">Live</span>
              </div>
            ))}
          </div>
        </section>

        {/* Alerts Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-300">AI-detected Behavior Alerts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`${levelStyles[alert.level]} p-5 rounded-xl border flex flex-col gap-3 shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10 flex items-center justify-center">
                    {alert.level === "critical" || alert.level === "high" ? (
                      <AlertTriangle className="text-red-400 w-6 h-6" />
                    ) : alert.level === "medium" ? (
                      <EyeOff className="text-orange-400 w-6 h-6" />
                    ) : (
                      <CheckCircle className="text-green-400 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base md:text-lg font-semibold">{alert.type}</h3>
                      <span className="text-xs md:text-sm opacity-60">{alert.time}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-300">{alert.desc}</p>
                    <p className="text-xs md:text-sm text-gray-400 italic">Source: {alert.camera}</p>
                    <div className="mt-2 flex gap-2 items-center text-sm md:text-base">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <span>
                        {alert.status === "Notified" ? (
                          <span className="text-green-400 font-medium">SMS Sent</span>
                        ) : alert.status === "Pending" ? (
                          <span className="text-yellow-400 font-medium">Pending Notification</span>
                        ) : (
                          <span className="text-gray-500 font-medium">No Action Needed</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BehaviorDashboard;
