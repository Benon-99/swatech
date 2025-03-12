import React from 'react';

const LoadingComponent: React.FC<{ message?: string }> = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
