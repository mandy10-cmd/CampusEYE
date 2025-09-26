import React, { useEffect, useRef, useState } from "react";
import { Bell, User, Play, StopCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RealtimeAnalysis = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOnline, setIsCameraOnline] = useState(true);
  const [started, setStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [keyMoments, setKeyMoments] = useState([]);
  const [serverResponse, setServerResponse] = useState("");

  const LLAMA_SERVER_URL = "http://127.0.0.1:8080/v1/chat/completions";
  const INTERVAL_MS = 1000; // 1 second interval
  const INSTRUCTION =
    "Analyze this frame and return JSON: {fight_or_tampering: 'Yes'/'No', description: '...', timestamp: 'hh:mm:ss'}";

  // Start camera
  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setIsCameraOnline(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setIsCameraOnline(false);
    }
  };

  useEffect(() => {
    startStream();
    return () => {
      stream?.getTracks()?.forEach((track) => track.stop());
      clearInterval(intervalId);
    };
  }, []);

  const stopStream = () => {
    stream?.getTracks()?.forEach((track) => track.stop());
    setIsCameraOnline(false);
    if (intervalId) clearInterval(intervalId);
    setStarted(false);
  };

  // Capture frame
  const captureFrame = () => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  };

  // Send frame to server
  const sendFrameToServer = async () => {
    const imageBase64 = captureFrame();
    if (!imageBase64) return;

    try {
      const response = await fetch(LLAMA_SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 100,
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: INSTRUCTION },
                { type: "image_url", image_url: { url: imageBase64 } },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setServerResponse(`Server Error: ${errorText}`);
        return;
      }

      const data = await response.json();

      // Extract content safely
      let rawContent = data.choices?.[0]?.message?.content;
      if (Array.isArray(rawContent)) {
        rawContent = rawContent.map((c) => c.text || c).join(" ");
      }

      setServerResponse(rawContent);

      // Parse JSON response safely
      let parsed;
      try {
        parsed = JSON.parse(rawContent);
      } catch (err) {
        console.warn("JSON parse failed, using fallback text:", rawContent);
        parsed = {
          timestamp: new Date().toLocaleTimeString(),
          description: rawContent || "No description",
          fight_or_tampering: "No",
        };
      }

      const newMoment = {
        timestamp: parsed.timestamp || new Date().toLocaleTimeString(),
        text: parsed.description || "No description",
        status: parsed.fight_or_tampering === "Yes" ? "dangerous" : "safe",
      };

      setKeyMoments((prev) => [...prev, newMoment]);
    } catch (err) {
      console.error("Error sending frame:", err);
      const fallbackMoment = {
        timestamp: new Date().toLocaleTimeString(),
        text: `Error: ${err.message}`,
        status: "safe",
      };
      setServerResponse(`Error: ${err.message}`);
      setKeyMoments((prev) => [...prev, fallbackMoment]);
    }
  };

  const handleStart = () => {
    if (!stream) return alert("Camera not available");
    setStarted(true);
    setKeyMoments([]);
    setServerResponse("Processing started...");
    const id = setInterval(sendFrameToServer, INTERVAL_MS);
    setIntervalId(id);
  };

  const handleStop = () => {
    if (intervalId) clearInterval(intervalId);
    setStarted(false);
    setServerResponse("Processing stopped.");
  };

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
            onClick={started ? handleStop : handleStart}
            className={`${
              started ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-3 rounded-full flex items-center space-x-2 transition duration-300`}
          >
            {started ? <StopCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{started ? "Stop Analysis" : "Start Analysis"}</span>
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Server Response */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-2">Server Response</h2>
        <textarea
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-sm font-mono text-green-400"
          rows={4}
          value={serverResponse}
          readOnly
        />
      </div>

      {/* Key Moments (full list) */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-xl font-semibold mb-2">Key Moments (All events)</h2>
        <div className="h-64 overflow-y-auto bg-gray-900 p-4 rounded-xl border border-gray-700">
          {keyMoments.map((moment, idx) => (
            <div
              key={idx}
              className={`mb-1 ${moment.status === "dangerous" ? "text-red-400" : "text-green-400"}`}
            >
              ⏱ {moment.timestamp} — {moment.text}
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center text-gray-600 text-sm py-4 border-t border-gray-800">
        © 2025 CampusEye Realtime. All rights reserved.
      </footer>
    </div>
  );
};

export default RealtimeAnalysis;
