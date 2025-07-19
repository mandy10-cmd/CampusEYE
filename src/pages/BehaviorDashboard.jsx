// File: BehaviorDashboard.jsx
import React from 'react';
import {
  Bell, Camera, AlertTriangle, ShieldAlert, CheckCircle, EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    time: "1 hour ago",
    status: "N/A",
    level: "safe",
  },
];

const levelStyles = {
  critical: 'bg-red-500/10 border-red-500/30 text-red-400',
  high: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  medium: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  safe: 'bg-green-500/10 border-green-500/30 text-green-400',
};

const BehaviorDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 overflow-y-auto">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex gap-2 items-center">
          <ShieldAlert className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Behavioral Monitoring Dashboard</h1>
        </div>
        <Link
          to="/"
          className="text-sm text-blue-300 hover:text-white transition-all border border-blue-500 px-4 py-2 rounded-lg"
        >
          ⬅ Back to Home
        </Link>
      </header>

      {/* Live Feeds */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Live Campus Feeds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {["Main Canteen", "Hostel Block A", "Library", "Entrance Gate", "Corridor", "Playground"].map((loc, i) => (
            <div
              key={i}
              className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex flex-col items-center justify-center hover:border-gray-600/50 transition"
            >
              <Camera className="w-10 h-10 text-gray-500 mb-2" />
              <p className="text-sm text-gray-300">{loc}</p>
              <span className="mt-2 text-green-400 text-xs">Live</span>
            </div>
          ))}
        </div>
      </section>

      {/* Alerts Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-300">AI-detected Behavior Alerts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`${levelStyles[alert.level]} p-4 rounded-xl border transition-all hover:shadow-xl`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  {alert.level === "critical" || alert.level === "high" ? (
                    <AlertTriangle className="text-red-400 w-5 h-5" />
                  ) : alert.level === "medium" ? (
                    <EyeOff className="text-orange-400 w-5 h-5" />
                  ) : (
                    <CheckCircle className="text-green-400 w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">{alert.type}</h3>
                    <span className="text-xs opacity-60">{alert.time}</span>
                  </div>
                  <p className="text-xs text-gray-300">{alert.desc}</p>
                  <p className="text-xs text-gray-400 italic">Source: {alert.camera}</p>
                  <div className="mt-2 flex gap-2 items-center text-sm">
                    <Bell className="w-4 h-4 text-gray-400" />
                    <span>
                      {alert.status === "Notified" ? (
                        <span className="text-green-400">SMS Sent</span>
                      ) : alert.status === "Pending" ? (
                        <span className="text-yellow-400">Pending Notification</span>
                      ) : (
                        <span className="text-gray-500">No Action Needed</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BehaviorDashboard;