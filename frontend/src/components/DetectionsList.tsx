import React from 'react';
import { Detection } from '../types';

interface DetectionsListProps {
  detections: Detection[];
}

const DetectionsList: React.FC<DetectionsListProps> = ({ detections }) => {
  if (detections.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No objects detected in the image.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Detected Objects ({detections.length})
      </h3>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Object
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bounding Box
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {detections.map((detection, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {detection.class_name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {(detection.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${detection.confidence * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  [{detection.bbox.map(coord => Math.round(coord)).join(', ')}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetectionsList;