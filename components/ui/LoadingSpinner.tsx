import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-dark fixed inset-0 z-50 backdrop-blur-md cyber-scanline">
      <div className="relative">
        {/* Cyber-themed background elements */}
        <div className="absolute -inset-12 opacity-75">
          <div className="w-48 h-48 rounded-full bg-secondary/20 animate-pulse"></div>
        </div>
        
        {/* Data grid effect */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Main spinner container */}
        <div className="relative w-auto h-auto">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 -m-8 border-4 border-transparent border-t-secondary border-r-secondary/50 rounded-full animate-spin"></div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-0 -m-4 border-4 border-secondary/30 rounded-full animate-pulse"></div>

          {/* Inner spinning ring */}
          <div className="absolute inset-0 -m-1 border-4 border-transparent border-t-secondary border-l-accent/50 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>

          {/* Center content */}
          <div className="relative px-6 py-4 cyber-border">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent opacity-30 blur-[2px]"></div>
            <div className="relative px-4 py-2 bg-dark">
              <span className="block text-3xl font-bold text-gradient">
                SWATECH
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
