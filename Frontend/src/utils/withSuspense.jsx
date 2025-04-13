import React, { Suspense } from "react";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

const withSuspense = (Component, message = "Loading...") => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col justify-center items-center ">
          <p className="text-xl sm:text-2xl font-medium text-gray-600 mb-6 animate-pulse">
            {message}
          </p>
          <Waveform size="40" stroke="3.5" speed="1" color="#4B5563" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default withSuspense;
