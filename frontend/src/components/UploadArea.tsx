import React, { useCallback } from 'react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, isLoading }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors ${
          isLoading ? 'bg-gray-100' : 'hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-4">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">Upload an image</p>
            <p className="text-sm text-gray-500">Drag and drop or click to select</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {isLoading ? 'Processing...' : 'Choose File'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;