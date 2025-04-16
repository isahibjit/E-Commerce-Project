// Cancel.jsx
import React from "react";
import homeBg from "../assets/homeBg.jpg";
import { FaTimesCircle } from "react-icons/fa";

const Cancel = () => {
  return (
    <div className="bg-red-50 min-h-screen">
      <div className="flex md:flex-row flex-col border border-gray-300 bg-red-100">
        <div className="md:w-1/2 flex justify-center items-center py-10">
          <div className="flex flex-col gap-4 text-center">
            <FaTimesCircle className="text-red-600 text-6xl mx-auto" />
            <h1 className="text-4xl font-semibold text-gray-700">
              Payment Cancelled ❌
            </h1>
            <p className="text-gray-600">
              Looks like you canceled the checkout. No worries — you can try again
              anytime!
            </p>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={homeBg} alt="Cancelled" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Cancel;
