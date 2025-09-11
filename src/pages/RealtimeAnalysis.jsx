import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  AlertTriangle,
  User,
  Play,
  StopCircle,
  Save,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

const RealtimeAnalysis = () => {
  const videoRef = useRef(null);
  const [isCameraOnline, setIsCameraOnline] = useState(true);
  const [stream, setStream] = useState(null);
  const [started, setStarted] = useState(false);
  const [keyMoments, setKeyMoments] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [fileName, setFileName] = useState("stream.mp4");
  const [backendAlerts, setBackendAlerts] = useState([]);

  // 🎥 Access Camera
  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraOnline(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setIsCameraOnline(false);
    }
  };

  useEffect(() => {
    startStream();

    return () => {
      stream?.getTracks()?.forEach((track) => track.stop());
    };
  }, []);

  const stopStream = () => {
    stream?.getTracks()?.forEach((track) => track.stop());
    setIsCameraOnline(false);
  };

  const handleStart = () => {
    setStarted(true);
    setKeyMoments([]);
    setTimeout(() => {
      setKeyMoments([
        {
          timestamp: "00:12",
          text: "A man is seated in a chair, looking forward with a neutral expression. Another person in the background appears to stretch.",
          status: "dangerous",
        },
        {
          timestamp: "00:22",
          text: "A person is sitting contemplatively. No suspicious activity detected.",
          status: "safe",
        },
      ]);
    }, 2000);
  };

  // Fake backend alerts for simulation
  useEffect(() => {
    const alerts = [
      { time: "00:10", message: "Fight detected in Hostel Lobby" },
      { time: "00:17", message: "Crowd forming near Canteen" },
      { time: "00:25", message: "Tampering at Library Wall" },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < alerts.length) {
        setBackendAlerts((prev) => [...prev, alerts[i]]);
        i++;
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-0 py-0 font-sans">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">CampusEye</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/realtime" className="text-gray-300 hover:text-white transition-colors">
              Live Dashboard
            </Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Analysis
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      {/* Video Feed */}
      <div className="max-w-4xl mx-auto mb-8 mt-7">
        <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl h-[400px] flex items-center justify-center">
          {isCameraOnline ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover rounded-xl"
              playsInline
            />
          ) : (
            <p className="text-red-400 text-lg">⚠️ Camera Unavailable</p>
          )}
        </div>

        <div className="text-center mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 flex items-center space-x-2 transition duration-300"
            disabled={started}
          >
            <Play className="w-4 h-4" />
            <span>Start Analysis</span>
          </button>
          <button
            onClick={stopStream}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 flex items-center space-x-2 transition duration-300"
          >
            <StopCircle className="w-4 h-4" />
            <span>Stop Streaming</span>
          </button>
        </div>
      </div>

      {/* Key Moments Timeline */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-1">Key Moments Timeline</h2>
        <p className="text-sm text-gray-500 mb-4">Start analysis to detect events</p>
        <div className="h-2 bg-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="w-[20%] bg-blue-600 h-full"></div>
        </div>
      </div>

      {/* Key Moments */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Key Moments</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-green-400">
              <Circle className="fill-green-400 w-3 h-3" /> Safe
            </div>
            <div className="flex items-center gap-1 text-red-400">
              <Circle className="fill-red-400 w-3 h-3" /> Dangerous
            </div>
          </div>
        </div>

        {keyMoments.length === 0 ? (
          <p className="text-gray-500">No events detected yet...</p>
        ) : (
          keyMoments.map((moment, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-4 rounded-xl mb-4 border-l-4 ${
                moment.status === "dangerous" ? "border-red-500" : "border-green-500"
              }`}
            >
              <p className="text-sm font-mono text-gray-400">⏱ {moment.timestamp}</p>
              <p className="text-sm mt-2">{moment.text}</p>
            </div>
          ))
        )}
      </div>

      

      {/* Save Recording */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-xl font-semibold mb-2">Save Recording</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none"
            placeholder="stream.mp4"
          />
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-4 border-t border-gray-800">
        © 2025 CampusEye Realtime. All rights reserved.
      </footer>
    </div>
  );
};

export default RealtimeAnalysis;