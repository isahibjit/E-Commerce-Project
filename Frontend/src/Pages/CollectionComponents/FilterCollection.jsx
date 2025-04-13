import React from 'react'
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
const FilterCollection = ({handleCharacterChange,handleTypeChange,handleScroll,filterClicked, setfilterClicked}) => {

 
  return (
    <div className="md:w-[25%] w-full">
    <div className="flex items-center pt-8">
      <h1 className="roboto-regular text-xl text-gray-800">FILTERS </h1>
      {filterClicked ? (
        <span
          onClick={() => setfilterClicked(false)}
          className={`cursor-pointer md:hidden block`}
        >
          <FaAngleDown />
        </span>
      ) : (
        <span
          onClick={() => setfilterClicked(true)}
          className={`cursor-pointer md:hidden block`}
        >
          <FaAngleRight />
        </span>
      )}
    </div>
    <div className={`  md:block ${filterClicked ? "block" : "hidden"}`}>
      <div className="md:flex   flex-col gap-4 py-8 ">
        <div className="border sticky  border-gray-300  flex flex-col gap-2 px-8 py-4">
          <h1 className="text-gray-950 font-semibold">CATEGORIES</h1>
          <div className="flex gap-2 text-gray-500">
            <input
              onClick={() => handleCharacterChange("Men")}
              type="checkbox"
              id="Men"
            />
            <label htmlFor="Men">Men</label>
          </div>
          <div className="flex gap-2 text-gray-500">
            <input
              onClick={() => handleCharacterChange("Women")}
              type="checkbox"
              id="Women"
            />
            <label htmlFor="Women">Women</label>
          </div>
          <div className="flex gap-2 text-gray-500">
            <input
              onClick={() => handleCharacterChange("Kids")}
              type="checkbox"
              id="Kids"
            />
            <label htmlFor="Kids">Kids</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-8">
        <div className="border w-full border-gray-300  flex flex-col gap-2 px-8 py-4">
          <h1 className="text-gray-950 font-semibold">Types</h1>
          <div className="flex gap-2 text-gray-500">
            <input
              onClick={() => handleTypeChange("Topwear")}
              type="checkbox"
              id="Topwear"
            />
            <label htmlFor="Topwear">Topwear</label>
          </div>
          <div className="flex gap-2 text-gray-500">
            <input
              onClick={() => handleTypeChange("Bottomwear")}
              type="checkbox"
              id="Bottomwear"
            />
            <label htmlFor="Bottomwear">Bottomwear</label>
          </div>
          <div className="flex gap-2 text-gray-500">
            <input
              onClick={() => handleTypeChange("Winterwear")}
              type="checkbox"
              id="Winterwear"
            />
            <label htmlFor="Winterwear">Winterwear</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FilterCollection