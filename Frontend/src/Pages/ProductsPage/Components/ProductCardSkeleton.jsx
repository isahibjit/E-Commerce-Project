import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-64 h-[550px] bg-base-100 shadow-sm rounded-xl overflow-hidden md:my-12 my-4 animate-pulse">
      {/* Image placeholder */}
      <figure className="h-[300px] bg-gray-200 w-full" aria-hidden="true"></figure>

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Title and Badge */}
        <div className="flex justify-between items-center">
          <div className="w-24 h-5 bg-gray-200 rounded-md"></div>
          <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
        </div>

        {/* Description lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-full bg-gray-200 rounded-md"></div>
        ))}

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <FaRupeeSign className="text-xl text-gray-200" />
            <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
