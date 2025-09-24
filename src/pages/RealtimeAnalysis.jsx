import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  AlertTriangle,
  User,
  Play,
  StopCircle,
  Save,
  Circle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const FRAME_INTERVAL = 1200; // milliseconds between frame analysis

const RealtimeAnalysis = () => {
  const videoRef = useRef(null);
  const [isCameraOnline, setIsCameraOnline] = useState(true);
  const [stream, setStream] = useState(null);
  const [started, setStarted] = useState(false);
  const [keyMoments, setKeyMoments] = useState([]);
  const [backendAlerts, setBackendAlerts] = useState([]);
  const [fileName, setFileName] = useState("stream.mp4");
  const [analyzing, setAnalyzing] = useState(false);
  const frameTimerRef = useRef(null);

  // Get current logged-in user's JWT token (implement as per your auth)
  const getToken = () => localStorage.getItem('access_token') || "";

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
      setIsCameraOnline(false);
    }
  };

  useEffect(() => {
    startStream();
    return () => {
      stream?.getTracks()?.forEach((track) => track.stop());
      clearInterval(frameTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Frame sending loop
  useEffect(() => {
    if (started && isCameraOnline && videoRef.current) {
      setAnalyzing(true);

      frameTimerRef.current = setInterval(async () => {
        await captureAndSendFrame();
      }, FRAME_INTERVAL);
    } else {
      setAnalyzing(false);
      clearInterval(frameTimerRef.current);
    }

    return () => clearInterval(frameTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, isCameraOnline]);

  const stopStream = () => {
    stream?.getTracks()?.forEach((track) => track.stop());
    setIsCameraOnline(false);
    setStarted(false);
    setAnalyzing(false);
    clearInterval(frameTimerRef.current);
  };

  const handleStart = () => {
    setKeyMoments([]);
    setBackendAlerts([]);
    setStarted(true);
  };

  // Draw video frame to canvas and send to backend
  const captureAndSendFrame = async () => {
    if (!videoRef.current || !isCameraOnline) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const now = new Date();
    const timestamp = now
      .toLocaleTimeString(undefined, { hour12: false })
      .slice(0, 8);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;
        // Prepare FormData for backend
        const formData = new FormData();
        formData.append("frame", blob, `frame-${timestamp}.jpg`);
        formData.append("frame_timestamp", timestamp);

        try {
          const token = getToken();
          const res = await fetch("http://127.0.0.1:8000/api/realtime/analyze/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
          if (!res.ok) return;
          const data = await res.json();
          // Add to "key moments" timeline if relevant
          setKeyMoments((prev) => [
            ...prev,
            {
              timestamp: data.frame_timestamp,
              text: data.description,
              status: data.fight_or_tampering === "Yes" ? "dangerous" : "safe",
            },
          ]);
          // Show alert in UI if alert found
          if (data.fight_or_tampering === "Yes") {
            setBackendAlerts((prev) => [
              ...prev,
              {
                time: data.frame_timestamp,
                message: `🚨 ALERT! Fight/tampering: ${data.action}`,
              },
            ]);
          }
        } catch (error) {
          // Optionally, show error to user
        }
      },
      "image/jpeg",
      0.8
    );
  };

  return (
    <div className="min-h-screen bg-black text-white px-0 py-0 font-sans">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">CampusEye</h1>
          <nav className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/realtime"
              className="text-gray-300 hover:text-white transition-colors"
            >
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
            disabled={started || !isCameraOnline}
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

      {/* Real-time Alerts */}
      {backendAlerts.length > 0 && (
        <div className="fixed top-7 right-8 z-50 w-[360px]">
          {backendAlerts
            .slice(-3)
            .reverse()
            .map((alert, idx) => (
              <div
                key={idx}
                className="bg-red-700/90 text-white px-5 py-3 rounded-lg mb-4 flex items-center gap-3 shadow-lg animate-bounce-in"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <div>
                  <span className="font-bold">{alert.message}</span>
                  <br />
                  <span className="text-gray-200 text-xs font-mono">
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Key Moments Timeline */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-1">Key Moments Timeline</h2>
        <p className="text-sm text-gray-500 mb-4">Start analysis to detect events</p>
        <div className="h-2 bg-gray-800 rounded-lg overflow-hidden mb-4">
          <div
            className="bg-blue-600 h-full"
            style={{
              width: keyMoments.length
                ? `${Math.min(100, keyMoments.length * 7)}%`
                : "4%",
            }}
          ></div>
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
          keyMoments
            .slice(-10)
            .reverse()
            .map((moment, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-4 rounded-xl mb-4 border-l-4 ${
                  moment.status === "dangerous"
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              >
                <p className="text-sm font-mono text-gray-400">
                  ⏱ {moment.timestamp}
                </p>
                <p className="text-sm mt-2">{moment.text}</p>
                {moment.status === "dangerous" && (
                  <div className="mt-2 text-red-400 flex gap-2 items-center">
                    <AlertTriangle className="w-4 h-4" /> Suspicious Activity
                  </div>
                )}
                {moment.status === "safe" && (
                  <div className="mt-2 text-green-400 flex gap-2 items-center">
                    <CheckCircle className="w-4 h-4" /> Safe
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {/* Save Recording - Placeholder */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-xl font-semibold mb-2">Save Recording</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none"
            placeholder="stream.mp4"
            disabled
          />
          <button
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition"
            disabled
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          (Saving is not implemented in this demo)
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
