import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadArea from './components/UploadArea';
import Preview from './components/Preview';
import DetectionsList from './components/DetectionsList';
import { detectImage } from './api/client';
import { DetectionResponse } from './types';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [detectionResult, setDetectionResult] = useState<DetectionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDetectionResult(null);
    setError('');
  }, []);

  const handleDetection = useCallback(async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await detectImage(selectedFile);
      setDetectionResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Detection failed');
      console.error('Detection error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const resetApp = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl('');
    setDetectionResult(null);
    setError('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Upload Section */}
        {!selectedFile && (
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Image for Object Detection
              </h2>
              <p className="text-gray-600">
                Select an image to detect objects using our YOLO model
              </p>
            </div>
            <UploadArea onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        )}

        {/* Preview and Controls */}
        {selectedFile && (
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDetection}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isLoading ? 'Detecting Objects...' : 'Detect Objects'}
              </button>
              <button
                onClick={resetApp}
                disabled={isLoading}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
              >
                Upload New Image
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="text-red-800">
                      <strong>Error:</strong> {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Image Preview */}
            <Preview 
              originalImage={previewUrl} 
              annotatedImage={detectionResult?.annotated_image}
            />

            {/* Detection Results */}
            {detectionResult && (
              <DetectionsList detections={detectionResult.detections} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;