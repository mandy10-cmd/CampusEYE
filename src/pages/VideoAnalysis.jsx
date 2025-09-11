import React, { useState } from 'react';
import { Bell, User, Upload } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import Link for routing

const VideoAnalysis = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const mockAnalysisData = [
    { timestamp: '00:05 - 00:11', action: 'Standing', falseAction: true },
    { timestamp: '00:12 - 00:19', action: 'Talking', falseAction: false },
    { timestamp: '00:20 - 00:57', action: 'Fighting', falseAction: false },
    { timestamp: '00:58 - 01:05', action: 'Running', falseAction: false }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);
    setAnalysisResults([]);

    const simulateProgress = () => {
      setUploadProgress((prev) => {
        if (prev < 100) {
          setTimeout(simulateProgress, 100);
          return prev + 5;
        } else {
          setIsUploading(false);
          setAnalysisResults(mockAnalysisData);
          return 100;
        }
      });
    };

    simulateProgress();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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

            {/* ✅ Link to Realtime CCTV page */}
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

      {/* Sidebar and Main */}
      <div className="flex">
        <aside className="w-64 bg-gray-800 min-h-screen border-r border-gray-700 p-4">
          <div className="text-white font-medium">Video Insights</div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-2">Upload Video for Analysis</h2>
            <p className="text-gray-400 mb-8">
              Upload your video to get detailed insights on timestamps and false actions.
            </p>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 mb-8 text-center relative">
              <input
                type="file"
                accept="video/*"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <div className="flex flex-col items-center">
                <div className="text-lg mb-2">Drag and drop a video here or click to select</div>
                {fileName && <div className="text-gray-400 mb-2">Selected: {fileName}</div>}
                <div className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Video</span>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">Uploading...</span>
                  <span className="text-gray-400">{uploadProgress}% complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResults.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Analysis Results</h3>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-700 border-b border-gray-600 font-medium">
                    <div>Timestamp</div>
                    <div>Action</div>
                    <div>False Action</div>
                  </div>
                  {analysisResults.map((result, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 p-4 border-b border-gray-700 last:border-b-0 text-gray-300"
                    >
                      <div>{result.timestamp}</div>
                      <div>{result.action}</div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={result.falseAction}
                          readOnly
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-500">
          <div className="flex justify-center space-x-8 mb-2">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <div>© 2025 CampusEye. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default VideoAnalysis;