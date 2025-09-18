import React, { useState, useRef } from 'react';
import { Upload, Bell, User, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
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
  
  // Results
  const [results, setResults] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs for streaming
  const readerRef = useRef(null);
  const controllerRef = useRef(null);

  /* ───────────────────────────────────────── Handle file upload with streaming */
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset all states
    setFileName(file.name);
    setIsUploading(true);
    setError('');
    setResults([]);
    setProgress(0);
    setCurrentFrame(0);
    setTotalFrames(0);
    setVideoMetadata(null);
    setStreamStatus('Uploading...');
    setIsComplete(false);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetchWithAuth(
        'http://127.0.0.1:8000/api/video-analysis-stream/',
        {
          method: 'POST',
          body: formData,
        }
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

      // Start streaming response handling
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
    if (!response.body) {
      throw new Error('Streaming not supported by browser');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    readerRef.current = reader;
    
    let buffer = '';

    try {
      while (true) {
        const { value, done } = await reader.read();
        
        if (done) {
          console.log('Stream completed');
          break;
        }

        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete lines (newline-delimited JSON)
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

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
    console.log('Stream message:', message);

    switch (message.type) {
      case 'status':
        setStreamStatus(message.message);
        break;

      case 'metadata':
        setVideoMetadata({
          fps: message.fps,
          totalFrames: message.total_frames,
          duration: message.duration
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
        setResults(prevResults => [...prevResults, message.data]);
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

  /* ───────────────────────────────────────── Cancel streaming */
  const cancelAnalysis = () => {
    if (readerRef.current) {
      readerRef.current.cancel();
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setIsUploading(false);
    setStreamStatus('Analysis cancelled');
  };

  /* ───────────────────────────────────────── Get alert count */
  const getAlertCount = () => {
    return results.filter(r => r.fight_or_tampering === 'Yes').length;
  };

  /* ───────────────────────────────────────── Render component */
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">CampusEye</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/realtime" className="text-gray-300 hover:text-white transition-colors">
              Live Dashboard
            </Link>
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

          {/* Upload Drop-zone */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <label
                htmlFor="file"
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer block transition-all ${
                  isUploading 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
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
                <div className="flex flex-col items-center">
                  {isUploading ? (
                    <Zap className="w-12 h-12 text-blue-400 mb-4 animate-pulse" />
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  )}
                  <div className="text-lg mb-2">
                    {isUploading ? 'Processing...' : 'Drop video here or click to select'}
                  </div>
                  {fileName && (
                    <div className="text-gray-400 mb-2">File: {fileName}</div>
                  )}
                  {!isUploading && (
                    <div className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors">
                      Choose File
                    </div>
                  )}
                </div>
              </label>

              {/* Progress and Status */}
              {(isUploading || streamStatus) && (
                <div className="mt-6 space-y-4">
                  {/* Status */}
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{streamStatus}</span>
                  </div>

                  {/* Progress bar */}
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

                  {/* Video metadata */}
                  {videoMetadata && (
                    <div className="text-xs text-gray-400 bg-gray-800 p-3 rounded">
                      Duration: {videoMetadata.duration.toFixed(1)}s | 
                      FPS: {videoMetadata.fps.toFixed(1)} | 
                      Total Frames: {videoMetadata.totalFrames}
                    </div>
                  )}

                  {/* Cancel button */}
                  {isUploading && (
                    <button
                      onClick={cancelAnalysis}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors"
                    >
                      Cancel Analysis
                    </button>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <div>
                    <strong>Error:</strong> {error}
                  </div>
                </div>
              )}
            </div>

            {/* Live Results Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
                {/* <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span>Live Results</span>
                </h3> */}

                {/* {results.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Frames Analyzed:</span>
                      <span className="font-bold">{results.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Incidents Detected:</span>
                      <span className={`font-bold ${getAlertCount() > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {getAlertCount()}
                      </span>
                    </div>
                  </div>
                )} */}

                {/* Latest results */}
                {/* <div className="space-y-2 max-h-96 overflow-y-auto">
                  {results.slice(-5).reverse().map((result, idx) => (
                    <div key={`${result.timestamp}-${idx}`} className="bg-gray-700 p-3 rounded text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-gray-300">{result.timestamp}</span>
                        {result.fight_or_tampering === 'Yes' ? (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div className="font-medium text-white mb-1">{result.action}</div>
                      <div className="text-gray-400 leading-relaxed">
                        {result.description}
                      </div>
                    </div>
                  ))}
                </div> */}

                {isComplete && (
                  <div className="mt-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-green-400 font-medium">Analysis Complete!</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full Results Table */}
          {results.length > 0 && (
            <section className="mt-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <span>Complete Analysis Results</span>
                {isComplete && <CheckCircle className="w-6 h-6 text-green-400" />}
              </h3>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-gray-700 border-b border-gray-600">
                  <span>Timestamp</span>
                  <span>Action</span>
                  <span>Status</span>
                  <span>Description</span>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result, idx) => (
                    <div
                      key={`${result.timestamp}-${idx}`}
                      className={`grid grid-cols-4 gap-4 p-4 border-b border-gray-700 last:border-b-0 text-gray-300 ${
                        result.fight_or_tampering === 'Yes' ? 'bg-red-500/10' : ''
                      }`}
                    >
                      <span className="font-mono text-sm">{result.timestamp}</span>
                      <span className="font-medium">{result.action}</span>
                      <span className="flex items-center space-x-1">
                        {result.fight_or_tampering === 'Yes' ? (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-semibold">Alert</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Normal</span>
                          </>
                        )}
                      </span>
                      <span className="text-sm leading-relaxed">
                        {result.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {isComplete && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-400">
                    <strong>Final Summary:</strong> Analyzed {results.length} frames from your video. 
                    {getAlertCount() > 0 ? (
                      <span className="text-red-400 ml-2 font-semibold">
                        ⚠ {getAlertCount()} potential incidents detected that require attention.
                      </span>
                    ) : (
                      <span className="text-green-400 ml-2 font-semibold">
                        ✓ No security incidents detected in this video.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-500">
          <div className="flex justify-center space-x-8 mb-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <div>© 2025 CampusEye. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default VideoAnalysis;
