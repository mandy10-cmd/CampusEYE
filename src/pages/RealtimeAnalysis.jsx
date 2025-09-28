import React, { useEffect, useRef, useState } from "react";
import { Bell, User, Play, StopCircle } from "lucide-react";

const RealtimeAnalysis = () => {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [keyMoments, setKeyMoments] = useState([]);
  const [isCameraOnline, setIsCameraOnline] = useState(true);

  const connectWS = () => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/realtime/");
    wsRef.current.onopen = () => console.log("WebSocket connected");
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setKeyMoments((prev) => [...prev, data]);
      } catch (err) {
        console.error("Invalid JSON from WS:", err, event.data);
      }
    };
    wsRef.current.onclose = () => console.log("WebSocket closed");
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOnline(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setIsCameraOnline(false);
    }
  };

  useEffect(() => {
    startStream();
    connectWS();
    return () => {
      wsRef.current?.close();
      videoRef.current?.srcObject?.getTracks()?.forEach((t) => t.stop());
    };
  }, []);

  const sendFrame = () => {
    if (!videoRef.current || !wsRef.current || wsRef.current.readyState !== 1) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    const base64 = dataUrl.split(",")[1];

    // Wrap in JSON
    wsRef.current.send(JSON.stringify({ frame: dataUrl }));
  };

  const handleStart = () => {
    setKeyMoments([]);
    setStarted(true);
    sendFrame(); // send immediately
    const interval = setInterval(sendFrame, 1000); // every 1 second
    wsRef.current._intervalId = interval;
  };

  const handleStop = () => {
    setStarted(false);
    clearInterval(wsRef.current._intervalId);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">CampusEye</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      {/* Video Feed */}
      <div className="max-w-4xl mx-auto my-8">
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

      {/* Key Moments */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-xl font-semibold mb-2">Key Moments (All events)</h2>
        <div className="h-64 overflow-y-auto bg-gray-900 p-4 rounded-xl border border-gray-700">
          {keyMoments.map((moment, idx) => (
            <div
              key={idx}
              className={`mb-2 ${moment.fight_or_tampering === "Yes" ? "text-red-400" : "text-green-400"}`}
            >
              ⏱ {moment.timestamp || "hh:mm:ss"} — {moment.description || "..."}
              {moment.snapshot && (
                <img
                  src={moment.snapshot}
                  alt="snapshot"
                  className="mt-1 w-32 h-auto rounded-md border border-gray-600"
                />
              )}
              {moment.threat_level !== undefined && (
                <p>Threat Level: {moment.threat_level}%</p>
              )}
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
