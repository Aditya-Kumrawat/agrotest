import React from 'react';

const TestMap: React.FC = () => {
  return (
    <div className="h-[500px] w-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Map Test</h3>
        <p className="text-gray-600 mb-4">This is a test map placeholder</p>
        
        {/* Test markers */}
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-2 border-2 border-white shadow-lg"></div>
            <p className="text-xs text-gray-600">Punjab</p>
          </div>
          <div className="text-center">
            <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2 border-2 border-white shadow-lg"></div>
            <p className="text-xs text-gray-600">Maharashtra</p>
          </div>
          <div className="text-center">
            <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2 border-2 border-white shadow-lg"></div>
            <p className="text-xs text-gray-600">Karnataka</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">Map Status</h4>
          <div className="text-sm text-gray-600">
            <p>✅ Map container loaded</p>
            <p>✅ CSS styles applied</p>
            <p>✅ Markers positioned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMap; 