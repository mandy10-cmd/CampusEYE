import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import {
  Eye, Shield, Camera, Activity, Database,
  Globe, Settings, BarChart3, Code, Cpu,
  Network, Lock, ChevronRight, Play, Zap,
  TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react';

const TrinetraLanding = () => {
  const [activeAlert, setActiveAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const alertColors = {
    red: 'bg-red-500/10 border-red-500/30 text-red-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden scroll-smooth">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-black/40 backdrop-blur-xl border-b border-gray-700/50 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trinetra
              </span>
            </div>
            <nav className="hidden md:flex gap-8 text-sm">
             <Link to="/" className="text-gray-300 hover:text-white transition-colors relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
             </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors relative group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
              </Link>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
                </a>
            </nav>
            <div className="flex gap-6 mt-2 text-sm">
              {/* Use Link for navigation */}
              <Link to="/login" className="text-gray-300 hover:text-white mt-2 transition-colors">Login</Link>
              
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-16 md:py-24 px-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 md:p-16 text-center border border-gray-700/50 shadow-2xl">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6 border border-blue-500/30">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Next-Gen Security Intelligence</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Trinetra: Vigilance
                <br />
                <span className="text-3xl md:text-5xl lg:text-6xl">Beyond Sight</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Advanced surveillance systems powered by AI for proactive threat detection and comprehensive security monitoring
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Get Started navigates to signup */}
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center min-w-[160px]"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 justify-center min-w-[160px]">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Dashboard Preview */}
      <section className="py-16 md:py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Live Security Dashboard
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Monitor your security in real-time with our intuitive dashboard interface
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Live Camera Feed</h3>
                <p className="text-gray-400">Real-time monitoring across all locations</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">4 Cameras Active</span>
                </div>
                <div className="flex gap-2">
                  <div className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
                  </div>
                  <div className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <BarChart3 className="w-5 h-5 text-gray-400 hover:text-white" />
                  </div>
                  <div className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <Lock className="w-5 h-5 text-gray-400 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-800/50 backdrop-blur-sm h-32 md:h-40 rounded-2xl flex flex-col justify-center items-center border border-gray-700/30 hover:border-gray-600/50 transition-all group">
                  <Camera className="w-12 h-12 text-gray-500 group-hover:text-gray-400 transition-colors mb-2" />
                  <span className="text-gray-400 text-sm">Camera {i + 1}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs">Live</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Recent Activity
              </h4>
              {[
                { type: "Threat Detected", cam: "Camera 1", desc: "Suspicious activity detected at main entrance", time: "2 min ago", color: "red", icon: AlertTriangle },
                { type: "Motion Alert", cam: "Camera 3", desc: "Movement detected in restricted area", time: "5 min ago", color: "yellow", icon: Activity },
                { type: "All Clear", cam: "Camera 2", desc: "No threats detected, area secure", time: "1 hour ago", color: "green", icon: CheckCircle },
              ].map(({ type, cam, desc, time, color, icon: Icon }, i) => (
                <div key={i} className={`${alertColors[color]} rounded-xl p-4 border transition-all hover:shadow-lg ${activeAlert === i ? 'ring-2 ring-current' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${color === 'red' ? 'bg-red-500/20' : color === 'yellow' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">{type} - {cam}</h5>
                        <span className="text-xs opacity-75 whitespace-nowrap ml-2">{time}</span>
                      </div>
                      <p className="text-xs opacity-90">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Built on cutting-edge AI and machine learning technologies for maximum security and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "AI Processing", desc: "Advanced AI algorithms with machine learning capabilities for intelligent threat detection", color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
              { icon: Network, title: "Deep Learning", desc: "Neural networks for pattern recognition and behavioral analysis", color: "from-purple-500 to-indigo-500", bg: "bg-purple-500/10" },
              { icon: Activity, title: "Real-time Updates", desc: "Live data processing and instant notifications across all devices", color: "from-green-500 to-emerald-500", bg: "bg-green-500/10" },
              { icon: Eye, title: "Computer Vision", desc: "Advanced image and video processing capabilities with object detection", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-500/10" },
              { icon: Database, title: "Scalable Backend", desc: "Cloud-native architecture designed for high performance and reliability", color: "from-orange-500 to-yellow-500", bg: "bg-orange-500/10" },
              { icon: BarChart3, title: "Analytics Engine", desc: "Comprehensive data visualization and intelligent reporting systems", color: "from-red-500 to-pink-500", bg: "bg-red-500/10" },
            ].map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div key={i} className={`${bg} backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 group`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-gray-700/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Your Security?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of organizations who trust Trinetra for their security needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Start Free Trial navigates to signup */}
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg min-w-[160px]"
              >
                Start Free Trial
              </Link>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-medium transition-all min-w-[160px]">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-xl border-t border-gray-700/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trinetra
              </span>
            </div>
            <div className="flex gap-8 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Support'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700/50 text-center text-gray-400">
            <p>© 2025 Trinetra. All rights reserved. Securing the future with intelligent surveillance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrinetraLanding;