import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const ProductsPageCardSkeleton = () => {
  return (
    <div>
      <div className="flex xl:flex-row flex-col gap-8 border border-x-0 border-b-0 border-gray-400 py-8">
        {/* Thumbnail Images Skeleton */}
        <div className="flex xl:flex-row flex-col-reverse gap-2 overflow-x-auto md:overflow-visible">
          <div className="flex xl:flex-col flex-row gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-24 rounded-lg bg-gray-300 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Main Image Skeleton */}
          <div className="max-w-[600px] z-20">
            <div className="w-[600px] h-[600px] bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="py-8 flex lg:flex-row w-full flex-col gap-8 justify-center">
          <div className="flex flex-col gap-5 w-full">
            {/* Product Title */}
            <div className="h-8 w-2/3 bg-gray-300 rounded animate-pulse"></div>

            {/* Ratings */}
            <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <FaRupeeSign className="text-xl text-gray-300 animate-pulse" />
              <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Quantity Dropdown */}
            <div className="flex flex-col gap-3">
              <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="h-20 w-full bg-gray-300 rounded animate-pulse"></div>

            {/* Size Options */}
            <div className="flex flex-col gap-4 md:w-2/3 w-full">
              <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 bg-gray-300 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>

              {/* Add to Cart Button */}
              <div className="h-12 w-40 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageCardSkeleton;
