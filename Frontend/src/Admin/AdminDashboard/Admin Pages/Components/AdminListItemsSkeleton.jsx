import React from "react";

const AdminListItemsSkeletons = () => {
  const skeletonArray = new Array(10).fill(0); // Renders 5 skeleton rows

  return (
    <div className="md:w-[70%] w-full px-2 py-4">
        <p className="text-gray-600">All Product List</p>
      <div className="flex items-center border bg-white my-2 shadow-md text-lg text-gray-700 px-2 font-semibold">
        <div className="w-[15%]">Image</div>
        <div className="w-[35%]">Name</div>
        <div className="w-[20%]">Category</div>
        <div className="w-[15%]">Price</div>
        <div className="w-[15%] hidden md:block">Action</div>
      </div>

      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="flex items-center border bg-white text-gray-700 border-gray-300 my-2 shadow-md px-2 py-4 animate-pulse"
        >
          <div className="w-[15%]">
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-md"></div>
          </div>
          <div className="w-[35%] px-2">
            <div className="h-4 bg-gray-300 rounded w-[80%] mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-[60%]"></div>
          </div>
          <div className="w-[20%] px-2">
            <div className="h-4 bg-gray-300 rounded w-[70%]"></div>
          </div>
          <div className="w-[15%] px-2">
            <div className="h-4 bg-gray-300 rounded w-[50%]"></div>
          </div>
          <div className="w-[15%] hidden md:flex gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminListItemsSkeletons;
