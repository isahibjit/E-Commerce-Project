import React from 'react'

const SortCollection = ({handleSortChange}) => {
  return (
    <div className="flex justify-between pt-7">
    <div className="flex items-center justify-start ">
      <h1 className="font-semibold  roboto-regular text-gray-500 text-2xl  ">
        ALL{" "}
        <span className="text-gray-800 font-semibold"> COLLECTIONS</span>
      </h1>
      <span className="w-13 h-[2px] bg-gray-900"></span>
    </div>
    <div>
      <select
        onChange={(e) => {
          handleSortChange(e.target.value);
        }}
        className="border-[2px] text-gray-700 border-gray-300 px-2 py-3 rounded-lg"
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