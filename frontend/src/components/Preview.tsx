import React from 'react';

interface PreviewProps {
  originalImage: string;
  annotatedImage?: string;
}

const Preview: React.FC<PreviewProps> = ({ originalImage, annotatedImage }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Original Image</h3>
          <div className="border rounded-lg overflow-hidden shadow-md">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
        </div>

        {/* Annotated Image */}
        {annotatedImage && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Detection Results</h3>
            <div className="border rounded-lg overflow-hidden shadow-md">
              <img
                src={`data:image/jpeg;base64,${annotatedImage}`}
                alt="Annotated"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;