import React, { useState, useRef, useEffect } from 'react';
import { Upload, Bell, User, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const VideoAnalysis = () => {
  // File upload states
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  // Streaming states
  const [streamStatus, setStreamStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState(null);

  // Video preview
  const [videoURL, setVideoURL] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const videoRef = useRef(null);

  // Results and snapshots
  const [results, setResults] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  // Refs for streaming
  const readerRef = useRef(null);
  const controllerRef = useRef(null);

  // Update slider when video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateSlider = () => {
      setSliderValue(video.currentTime);
    };

    video.addEventListener('timeupdate', updateSlider);
    return () => video.removeEventListener('timeupdate', updateSlider);
  }, [videoURL]);

  /* ───────────────────────────────────────── Handle file upload with streaming */
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setError('');
    setResults([]);
    setSnapshots([]);
    setProgress(0);
    setCurrentFrame(0);
    setTotalFrames(0);
    setVideoMetadata(null);
    setStreamStatus('Uploading...');
    setIsComplete(false);

    // Set video preview immediately
    const url = URL.createObjectURL(file);
    setVideoURL(url);
    setSliderValue(0);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetchWithAuth(
        'http://127.0.0.1:8000/api/video-analysis-stream/',
        { method: 'POST', body: formData }
      );

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.detail || `HTTP ${response.status}`);
        } catch {
          throw new Error(errorText || `HTTP ${response.status}`);
        }
      }

      await handleStreamingResponse(response);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed');
      setIsUploading(false);
      setStreamStatus('');
    }
  };

  /* ───────────────────────────────────────── Handle streaming response */
  const handleStreamingResponse = async (response) => {
    if (!response.body) throw new Error('Streaming not supported by browser');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    readerRef.current = reader;

    let buffer = '';

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const message = JSON.parse(line);
              handleStreamMessage(message);
            } catch (parseError) {
              console.error('Failed to parse message:', line, parseError);
            }
          }
        }
      }
    } catch (streamError) {
      if (streamError.name !== 'AbortError') {
        console.error('Stream error:', streamError);
        setError(`Streaming error: ${streamError.message}`);
      }
    } finally {
      setIsUploading(false);
      readerRef.current = null;
    }
  };

  /* ───────────────────────────────────────── Handle individual stream messages */
  const handleStreamMessage = (message) => {
    switch (message.type) {
      case 'status':
        setStreamStatus(message.message);
        break;
      case 'metadata':
        setVideoMetadata({
          fps: message.fps,
          totalFrames: message.total_frames,
          duration: message.duration,
        });
        setStreamStatus(message.message);
        break;
      case 'progress':
        setProgress(message.progress || 0);
        setCurrentFrame(message.current_frame || 0);
        setTotalFrames(message.total_frames || 0);
        setStreamStatus(`Processing frame ${message.current_frame || 0}...`);
        break;
      case 'result':
        setResults(prev => [...prev, message.data]);
        if (message.data.fight_or_tampering === 'Yes' && message.snapshot) {
          setSnapshots(prev => [
            ...prev,
            { frame: message.data.timestamp, image: message.snapshot }
          ]);
        }
        break;
      case 'complete':
        setIsComplete(true);
        setIsUploading(false);
        setStreamStatus(message.message);
        setProgress(100);
        break;
      case 'error':
        setError(message.message);
        setIsUploading(false);
        setStreamStatus('');
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  const cancelAnalysis = () => {
    if (readerRef.current) readerRef.current.cancel();
    if (controllerRef.current) controllerRef.current.abort();
    setIsUploading(false);
    setStreamStatus('Analysis cancelled');
  };

  const getAlertCount = () => results.filter(r => r.fight_or_tampering === 'Yes').length;

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    setSliderValue(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">CampusEye</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/realtime" className="text-gray-300 hover:text-white transition-colors">Live Dashboard</Link>
            <span className="text-white font-medium">Analysis</span>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Real-Time Video Analysis</h2>
          <p className="text-gray-400 mb-8">
            Upload a video and see analysis results in real-time as each frame is processed.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Upload & Video Preview */}
              <label
                htmlFor="file"
                className={`border-2 border-dashed rounded-lg p-4 text-center block transition-all ${
                  isUploading ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <input
                  id="file"
                  type="file"
                  accept="video/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                  onChange={handleFileUpload}
                />

                {videoURL ? (
                  <div className="flex flex-col items-center">
                    <video
                      ref={videoRef}
                      src={videoURL}
                      controls
                      className="w-full h-96 rounded-lg bg-black mb-2"
                    />
                    {videoMetadata && (
                      <input
                        type="range"
                        min={0}
                        max={videoMetadata.duration}
                        step={0.1}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full"
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-16">
                    {isUploading ? (
                      <Zap className="w-12 h-12 text-blue-400 mb-4 animate-pulse" />
                    ) : (
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    )}
                    <div className="text-lg mb-2">
                      {isUploading ? 'Processing...' : 'Drop video here or click to select'}
                    </div>
                    {fileName && <div className="text-gray-400 mb-2">File: {fileName}</div>}
                    {!isUploading && <div className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors">Choose File</div>}
                  </div>
                )}

              </label>

              {/* Progress & Status */}
              {(isUploading || streamStatus) && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{streamStatus}</span>
                  </div>

                  {totalFrames > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span>Frame {currentFrame} of {totalFrames}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {videoMetadata && (
                    <div className="text-gray-400 text-xs mt-1">
                      Duration: {videoMetadata.duration.toFixed(1)}s | FPS: {videoMetadata.fps.toFixed(1)}
                    </div>
                  )}

                  {isUploading && (
                    <button
                      onClick={cancelAnalysis}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors mt-2"
                    >
                      Cancel Analysis
                    </button>
                  )}
                </div>
              )}

              {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>

            {/* Alerts summary */}
            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Alerts</h3>
              <div className="flex items-center justify-between text-gray-400">
                <div>Fights/Property Tampering Detected:</div>
                <div className="text-amber-400 font-bold">{getAlertCount()}</div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-3">Analysis Results</h3>
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-400">Timestamp</th>
                    <th className="px-4 py-2 text-left text-gray-400">Action</th>
                    <th className="px-4 py-2 text-left text-gray-400">Description</th>
                    <th className="px-4 py-2 text-left text-gray-400">Fight/Tampering</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((res, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="px-4 py-2">{res.timestamp}</td>
                      <td className="px-4 py-2">{res.action}</td>
                      <td className="px-4 py-2">{res.description}</td>
                      <td className={`px-4 py-2 font-bold ${res.fight_or_tampering === 'Yes' ? 'text-red-500' : 'text-green-400'}`}>
                        {res.fight_or_tampering}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Snapshots of Threats */}
          {snapshots.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Snapshots of Threats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {snapshots.map((snap, idx) => (
                  <div key={idx} className="bg-gray-800 p-2 rounded-lg">
                    <img src={snap.image} alt={`Frame ${snap.frame}`} className="rounded mb-2 w-full h-48 object-cover" />
                    <div className="text-xs text-gray-400">{snap.frame}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default VideoAnalysis;