import React from "react";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen  bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 animate-pulse drop-shadow-md">
          Hang tight! 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          We're Adding  Details...
        </p>
        <div className="flex justify-center">
          <Hourglass size="180" bgOpacity="0.2" speed="1.5" color="#2563EB" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
