import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Camera,
  Activity,
  Database,
  Settings,
  BarChart3,
  Lock,
  ChevronRight,
  Play,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Network,
} from "lucide-react";

const TrinetraLanding = () => {
  const [activeAlert, setActiveAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Modal signup logic
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("enterEmail"); // Step: 'enterEmail' => 'enterCode'
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const dummyVerificationCode = "123456";

  const sendCodeAPI = () =>
    new Promise((res) => {
      console.log(`✅ Code ${dummyVerificationCode} sent to:`, email);
      setTimeout(res, 1000); // fake wait
    });

  const verifyCodeAPI = () =>
    new Promise((res, rej) => {
      setTimeout(() => {
        code === dummyVerificationCode ? res() : rej(new Error("Invalid code"));
      }, 1000);
    });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const alertColors = {
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
  };

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
              Trinetra
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition-colors relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex gap-6 mt-2 text-sm">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white mt-2 transition-colors"
            >
              Login
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              SignUp
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <section
        className={`relative py-16 md:py-24 px-6 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-700/50">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-5 py-2 mb-6 border border-blue-500/30">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">
                Next-Gen Security Intelligence
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Trinetra: Vigilance <br />
              <span className="text-3xl md:text-5xl mt-4 px-4 py-4 ">Beyond Sight</span>
            </h1>
            <p className="text-md md:text-xl text-gray-300 mt-8 mb-8 max-w-xl mx-auto">
              AI-powered surveillance for proactive threat & behavior detection
              in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-white rounded-xl font-medium shadow-lg flex items-center gap-2 transition hover:scale-105"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 text-white rounded-xl font-medium">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
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
              Monitor your security in real-time with our intuitive dashboard
              interface
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  Live Camera Feed
                </h3>
                <p className="text-gray-400">
                  Real-time monitoring across all locations
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">
                    4 Cameras Active
                  </span>
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
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-800/50 backdrop-blur-sm h-32 md:h-40 rounded-2xl flex flex-col justify-center items-center border border-gray-700/30 hover:border-gray-600/50 transition-all group"
                  >
                    <Camera className="w-12 h-12 text-gray-500 group-hover:text-gray-400 transition-colors mb-2" />
                    <span className="text-gray-400 text-sm">
                      Camera {i + 1}
                    </span>
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
                  desc: "No threats detected, area secure",
                  time: "1 hour ago",
                  color: "green",
                  icon: CheckCircle,
                },
              ].map(({ type, cam, desc, time, color, icon: Icon }, i) => (
                <div
                  key={i}
                  className={`${
                    alertColors[color]
                  } rounded-xl p-4 border transition-all hover:shadow-lg ${
                    activeAlert === i ? "ring-2 ring-current" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        color === "red"
                          ? "bg-red-500/20"
                          : color === "yellow"
                          ? "bg-yellow-500/20"
                          : "bg-green-500/20"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">
                          {type} - {cam}
                        </h5>
                        <span className="text-xs opacity-75 whitespace-nowrap ml-2">
                          {time}
                        </span>
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
       


      {/* ✅ Modal Email Signup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm animate-fadeIn">
            <h3 className="text-lg font-semibold text-white mb-4">
              {step === "enterEmail"
                ? "Verify your email"
                : "Enter verification code"}
            </h3>

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            {step === "enterEmail" ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4 p-3 rounded bg-black/30 border border-gray-600 text-white"
                />
                <button
                  onClick={async () => {
                    if (!email) {
                      setError("Please enter your email.");
                      return;
                    }
                    setVerifying(true);
                    setError("");
                    try {
                      await sendCodeAPI();
                      setStep("enterCode");
                    } catch {
                      setError("Failed to send code.");
                    } finally {
                      setVerifying(false);
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
                >
                  {verifying ? "Sending..." : "Send Code"}
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full mb-4 p-3 rounded bg-black/30 border border-gray-600 text-white"
                />
                <button
                  onClick={async () => {
                    if (!code) {
                      setError("Please enter the code.");
                      return;
                    }
                    setVerifying(true);
                    try {
                      await verifyCodeAPI();
                      setShowModal(false);
                      setCode("");
                      setEmail("");
                      setStep("enterEmail");
                      setError("");
                      navigate("/signup");
                    } catch {
                      setError("Incorrect code.");
                    } finally {
                      setVerifying(false);
                    }
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white"
                >
                  {verifying ? "Verifying..." : "Verify & Continue"}
                </button>
              </>
            )}

            <button
              onClick={() => {
                setShowModal(false);
                setCode("");
                setEmail("");
                setError("");
                setStep("enterEmail");
              }}
              className="mt-3 text-sm text-gray-400 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrinetraLanding;
