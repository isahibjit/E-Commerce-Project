import React, { useEffect, useState } from "react";

const SearchBar = ({ handleSearchChange }) => {
  return (
    <div className="flex items-center justify-center  border border-gray-300  border-x-0 border-t-0  py-4">
      <input
        type="text"
        className="py-3 rounded-full w-[50%] md:text-lg text-sm px-4 border border-purple-200 outline-purple-300"
        placeholder="Search"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
