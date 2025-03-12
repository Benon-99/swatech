import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -inset-8 opacity-75">
          <div className="w-32 h-32 rounded-full bg-blue-100 animate-ping"></div>
        </div>

        {/* Main spinner container */}
        <div className="relative w-28 h-28">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-400 rounded-full animate-spin"></div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-2 border-4 border-blue-200 rounded-full animate-pulse"></div>

          {/* Inner spinning ring */}
          <div className="absolute inset-4 border-4 border-transparent border-t-blue-600 border-l-blue-500 rounded-full animate-spin"></div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="block text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                IC&I
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
