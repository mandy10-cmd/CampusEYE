import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Camera,
  Activity,
  Settings,
  BarChart3,
  Lock,
  ChevronRight,
  Play,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const TrinetraLanding = () => {
  const [activeAlert, setActiveAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const alertColors = {
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="relative bg-black/40 backdrop-blur-xl border-b border-gray-700/50 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CampusEye
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition relative group">
              Home
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition relative group">
              Dashboard
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
            </Link>
          </nav>

          <div className="flex gap-4 text-sm">
            <Link to="/login" className="text-gray-300 hover:text-white mt-1 transition-colors">Login</Link>
            <button
              onClick={() => navigate("/email-verification")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-16 md:py-24 px-6 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl">
            <div className="inline-flex gap-2 items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 rounded-full px-5 py-2 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Next-Gen Security Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              CampusEye: Vigilance <br />
              <span className="text-3xl md:text-5xl">Beyond Sight</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
              AI-powered surveillance for proactive threat & behavior detection in real-time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/email-verification")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-white rounded-xl shadow-lg font-medium hover:scale-105 transition-all flex items-center gap-2"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-3 rounded-xl text-white font-medium flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Live Security Dashboard
          </h2>
          <p className="text-gray-300 mb-12">
            Monitor your security in real-time with our intuitive dashboard interface.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-md p-5 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors group">
                <Camera className="w-10 h-10 text-gray-400 group-hover:text-white mb-2" />
                <p className="text-gray-400 text-sm">Camera {i + 1}</p>
                <span className="text-xs text-green-400 flex items-center gap-1 mt-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live
                </span>
              </div>
            ))}
          </div>

          {/* Recent Alerts */}
          <h4 className="text-lg font-semibold flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </h4>
          <div className="space-y-3 text-left max-w-2xl mx-auto">
            {[
              {
                type: "Threat Detected",
                cam: "Camera 1",
                desc: "Suspicious activity detected at main entrance",
                time: "2 min ago",
                color: "red",
                icon: AlertTriangle,
              },
              {
                type: "Motion Alert",
                cam: "Camera 3",
                desc: "Movement detected in restricted area",
                time: "5 min ago",
                color: "yellow",
                icon: Activity,
              },
              {
                type: "All Clear",
                cam: "Camera 2",
                desc: "No threats detected",
                time: "1 hour ago",
                color: "green",
                icon: CheckCircle,
              },
            ].map(({ type, cam, desc, time, color, icon: Icon }, i) => (
              <div
                key={i}
                className={`${alertColors[color]} p-4 rounded-xl border border-gray-700/30`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${color}-500/20`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <h5 className="font-semibold text-sm">{type} - {cam}</h5>
                      <span className="text-xs opacity-70">{time}</span>
                    </div>
                    <p className="text-xs opacity-90">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-xl border-t border-gray-700/50 py-10 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 CampusEye. Securing the future with intelligent surveillance.</p>
        </div>
      </footer>
    </div>
  );
};

export default TrinetraLanding;
