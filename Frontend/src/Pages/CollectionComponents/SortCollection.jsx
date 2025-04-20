import React from 'react'

const SortCollection = ({handleSortChange}) => {
  return (
    <div className="flex justify-between   md:pt-7 ">
    <div className="flex items-center  ">
      <h1 className="font-semibold  roboto-regular  text-sm text-gray-500 md:text-2xl   ">
        ALL
        <span className="text-gray-800 font-semibold"> COLLECTIONS</span>
      </h1>
      <span className="md:w-13 w-8 h-[2px] bg-gray-900"></span>
    </div>
    <div className=" ">
      <select
        onChange={(e) => {
          handleSortChange(e.target.value);
        }}
        className="border-[2px] text-gray-700 border-gray-300 px-2 py-3 rounded-lg w-[170px] md:text-md text-sm"
      >
        <option value="default" className="px-24">
          Sort By: Relevant
        </option>
        <option value="ASC" className="px-24">
          Sort By: Low to High
        </option>
        <option value="DESC" className="px-24">
          Sort By: High to Low
        </option>
      </select>
    </div>
  </div>
  )
}

export default SortCollection