import React from "react";

const OrderCardSkeleton = () => {
  return (
    <article className=" border-gray-300 border border-x-0 py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4">
          <div className="rounded-lg overflow-hidden w-28 h-28 sm:w-32 sm:h-32 bg-gray-300 animate-pulse"></div>

          <div className="flex flex-col justify-center gap-1">
            <h2 className="font-semibold bg-gray-300 w-54 rounded-md h-5"></h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700 font-medium">
              <span className="text-gray-400 bg-gray-300 w-14 h-5 rounded-lg animate-pulse text-center">
                ₹
              </span>
              <span className="bg-gray-300 w-14 h-5 rounded-lg animate-pulse">
                {" "}
              </span>
              <span className="bg-gray-300 w-14 h-5 rounded-lg animate-pulse"></span>
            </div>

            <div className="flex  gap-3">
              <span className="bg-gray-300 w-36 h-5 rounded-lg animate-pulse"></span>
            </div>

            <div className="flex gap-3">
              <span className="bg-gray-300 w-36 h-5 rounded-lg animate-pulse"></span>
            </div>
          </div>
        </div>
        <div className="flex md:w-1/2 w-full  justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
            <span className="bg-gray-300 w-36 h-5 rounded-lg animate-pulse"></span>
          </div>

          <div>
            <button className="bg-gray-300 animate-pulse  px-4 py-2 rounded-sm w-28 h-8  "></button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCardSkeleton;
