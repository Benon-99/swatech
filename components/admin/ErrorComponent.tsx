import React from 'react';

const ErrorComponent: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = "Oops! Something went wrong.",
  onRetry,
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-500">{message}</h2>
        <p className="text-gray-300">We were unable to load the content. Please try again later.</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
