import React from "react";

const OrderCardSkeleton = () => {
  const skeletonArray = new Array(8).fill(0); // Renders 5 skeleton rows
  return (
    <>
      {skeletonArray.map((_, idx) => (
        <div className="border my-8 border-gray-400 rounded-md shadow p-4 bg-white">
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            {/* Product Info Skeleton */}
            <div className="flex gap-4 md:w-1/3">
              <div className="w-12 h-12 bg-gray-300 rounded animate-pulse" />
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-2/3 mt-3 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
              </div>
            </div>

            {/* Order Info Skeleton */}
            <div className="space-y-2 md:w-1/3">
              <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
            </div>

            {/* Dropdown Skeleton */}
            <div className="md:w-1/3">
              <div className="h-8 bg-gray-300 rounded w-full md:w-40 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderCardSkeleton;
