import React from "react";
import {
  Video,
  Upload,
  Bell,
  Bot,
  BarChart3,
  Archive,
  Code,
  Brain,
  Clock,
  MessageSquare,
  Server,
  Mail,
  Camera,
  Menu,
} from "lucide-react";

const features = [
  { icon: <Video />, title: "Real-time Video Analysis", desc: "Analyze live video feeds in real-time to detect and respond to potential threats." },
  { icon: <Upload />, title: "Upload Existing Videos", desc: "Upload and analyze existing video footage to identify past security events." },
  { icon: <Bell />, title: "Instant Alerts", desc: "Receive immediate alerts via email or phone." },
  { icon: <Bot />, title: "AI-Powered Assistant", desc: "Insights from our AI assistant, powered by advanced language models." },
  { icon: <BarChart3 />, title: "Intuitive Dashboard", desc: "Easy monitoring of your surveillance system." },
  { icon: <Archive />, title: "Footage Library", desc: "Securely store and manage surveillance footage." },
];

const techStack = [
  { icon: <Code />, title: "Frontend", desc: "Next.js, Tailwind CSS" },
  { icon: <Brain />, title: "AI Processing", desc: "Gemini VLM, TensorFlow.js" },
  { icon: <Clock />, title: "Real-time Updates", desc: "Canvas API" },
  { icon: <MessageSquare />, title: "Contextual Assistance", desc: "OpenAI language models" },
  { icon: <Server />, title: "Backend", desc: "Supabase" },
  { icon: <Mail />, title: "Email/Phone Service", desc: "Resend API" },
];

export default function LandingPage() {
  return (
    <div className="bg-[#121212] text-white font-sans antialiased">

      {/* ✅ Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212] bg-opacity-90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">Trinetra</div>
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#dashboard" className="hover:text-blue-400 transition-colors">Dashboard</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Login</a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Signup</a>
          </div>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="relative h-[60vh] w-full mt-[80px]">
        <div className="absolute inset-0">
          <img
            src="/trinetra-hero-bg.jpeg"
            alt="Surveillance Camera"
            className="w-full h-full object-cover object-center brightness-[0.5]"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Trinetra: Vigilance Beyond Sight
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
            Advanced surveillance system for proactive crime detection and enhanced security
          </p>
          <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </header>

      {/* ✅ Features Section */}
      <section id="features" className="py-20 px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Key Features</h2>
        <p className="text-md md:text-lg text-center mb-12 text-gray-400 max-w-3xl mx-auto">
          Trinetra offers a suite of features designed to enhance your security and provide peace of mind.
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-6 bg-[#1d1d1d] hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
              <div className="mb-4 text-blue-400 flex justify-center text-4xl">{f.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Dashboard Section */}
      <section id="dashboard" className="py-20 px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dashboard</h2>
        <div className="bg-[#1d1d1d] rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <span className="font-semibold flex items-center text-xl mb-4 md:mb-0">
              <Camera className="mr-3 text-blue-400" size={24} />
              Trinetra-AI Dashboard
            </span>
            <span className="text-sm bg-gray-800 px-4 py-2 rounded-full text-gray-400">
              4 Cameras Active
            </span>
          </div>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Live Camera Feed</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-800 rounded-lg p-4 aspect-video relative flex flex-col items-center justify-center border border-gray-700 overflow-hidden">
                    <Camera className="h-16 w-16 text-gray-500 mb-2" />
                    <span className="absolute bottom-2 left-3 text-xs text-gray-400">Camera {i}</span>
                    <span className="absolute bottom-2 right-3 text-xs text-red-500 font-semibold animate-pulse">Live</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
              <ul className="space-y-4">
                {[
                  { type: "red", label: "Danger Detected - Camera 2", time: "21 June 16:55:40" },
                  { type: "yellow", label: "Camera Offline - Camera 3", time: "18 June 16:55:40" },
                  { type: "purple", label: "Power Loss", time: "11 June 16:55:40" },
                ].map((alert, i) => (
                  <li key={i} className={`p-4 rounded-lg border text-sm
                    ${alert.type === 'red' ? 'bg-red-900/20 border-red-600 text-red-300' : ''}
                    ${alert.type === 'yellow' ? 'bg-yellow-900/20 border-yellow-600 text-yellow-300' : ''}
                    ${alert.type === 'purple' ? 'bg-purple-900/20 border-purple-600 text-purple-300' : ''}`}>
                    <div className="font-semibold mb-1">{alert.label}</div>
                    <div className="text-gray-500 text-xs">{alert.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Tech Stack Section */}
      <section className="py-20 px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Tech Stack</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((tech, i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-6 bg-[#1d1d1d] hover:border-blue-500 transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-blue-400 mb-4 text-4xl flex justify-center">{tech.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{tech.title}</h3>
              <p className="text-gray-400 text-sm">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Footer / Contact Section */}
      <footer id="contact" className="bg-[#121212] text-gray-400 py-12 px-4 md:px-6 lg:px-16 text-center">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">Contact Us</h2>
          <p>
            Have Questions or Need any Assistance? Reach us at{" "}
            <a href="mailto:support@trinetraai.com" className="text-blue-400 hover:underline">
              support@trinetraai.com
            </a>
          </p>
        </div>
        <div className="flex justify-center space-x-8 mb-4 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p className="text-xs text-gray-500">© 2025 Trinetra. All rights reserved.</p>
      </footer>
    </div>
  );
}
