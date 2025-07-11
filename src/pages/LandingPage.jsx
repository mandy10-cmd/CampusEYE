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
    <div className="bg-[#121212] text-white font-sans ">
      {/* Hero */}
      <header className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <img
            src="/trinetra-hero-bg.jpeg"
            alt="Hero"
            className="w-full h-full object-cover object-center brightness-[0.5]"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Trinetra: Vigilance Beyond Sight
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-6">
            Advanced surveillance system for proactive crime detection and enhanced security
          </p>
          <button className="bg-blue-500 text-white font-semibold px-30 py-30 rounded hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-16 max-w-7x1 ">
        <h2 className="text-4xl font-bold text-center mb-6">Key Features</h2>
        <p className="text-2xl  text-center mb-15 text-gray-400 ">
          Trinetra offers a suite of features designed to enhance your security and provide peace of mind.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="border border-gray-700 rounded-lg p-5 mt-1 bg-[#1d1d1d] hover:border-blue-500 transition"
            >
              <div className="mb-4 text-blue-400 flex justify-center mt-6 text-3xl ">{f.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-6">{f.title}</h3>
              <p className="text-gray-400 text-sm text-center mb-15">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-20 px-6 max-w-9xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6">Dashboard</h2>
        <div className="bg-[#1d1d1d] rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <span className="font-semibold flex items-center text-lg">
              <Camera className="mr-2" />
              Trinetra-AI Dashboard
            </span>
            <span className="text-sm bg-gray-800 px-3 py-1 rounded-full text-gray-400 mt-2 md:mt-0">
              4 Cameras Active
            </span>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Camera Feeds */}
            <div className="lg:col-span-2">
              <h3 className="text-md font-semibold mb-4">Live Camera Feed</h3>
              <div className="grid md:grid-cols-2 gap-15">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-700 rounded-lg p-4 aspect-video relative flex items-center justify-center"
                  >
                    <Camera className="h-15 w-15 text-gray-500" />
                    <span className="absolute left- bottom-2 text-xs text-gray-400">Camera {i}</span>
                    <span className="absolute right-3 bottom-2 text-xs text-red-500 animate-pulse">Live</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div>
              <h3 className="text-md font-semibold mb-4">Recent Alerts</h3>
              <ul className="space-y-3">
                {[
                  { type: "red", label: "Danger Detected - Camera 2", time: "21 June 16:55:40" },
                  { type: "yellow", label: "Camera Offline - Camera 3", time: "18 June 16:55:40" },
                  { type: "purple", label: "Power Loss", time: "11 June 16:55:40" },
                ].map((alert, i) => (
                  <li
                    key={i}
                    className={`p-4 rounded bg-${alert.type}-900/20 border border-${alert.type}-600 text-sm`}
                  >
                    <div className={`text-${alert.type}-400 font-semibold`}>{alert.label}</div>
                    <div className="text-gray-500 text-xs">{alert.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 max-w-9x1 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Tech Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="border border-gray-700 rounded-lg p-6 bg-[#1d1d1d] hover:border-blue-500 transition text-center"
            >
              <div className="text-blue-400 mb-4 text-3xl flex justify-center">
                {tech.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{tech.title}</h3>
              <p className="text-gray-400 text-sm">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-100 px-600">
        <div className="max-w-9xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="space-x-10 text-gray-400 text-sm">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
          <p className="text-gray-600 text-sm">© 2025 Trinetra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}