import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CartContext } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    cartItems,
    getTotalPrice,
    getSubTotalPrice,
    getTotalShippingFees,
  } = useContext(CartContext);
  const navigate = useNavigate()
  useEffect(() => {
    if(cartItems.length === 0){
      sessionStorage.setItem("showEmptyCartToast", "true");
      navigate("/",{replace: true,})
    }
  }, [cartItems])
  
  return (
    <div className="w-full h-screen ">
      <div className="flex  items-center justify-start py-12 ">
        <h1 className="font-semibold  roboto-regular text-gray-500 text-2xl  ">
          DELIVERY{" "}
          <span className="text-gray-800 font-semibold"> INFORMATION</span>
        </h1>
        <span className="w-13 h-[2px] bg-gray-900"></span>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-between gap-4">
        <div className="md:w-1/2 w-full ">
          <div className="form  w-full flex flex-col gap-3">
            <div className="flex gap-3 ">
              <input
                type="text"
                placeholder="First Name"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Street"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="City"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md  w-full"
              />
              <input
                type="text"
                placeholder="State"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md  w-full"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Pincode"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Country"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone"
                className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
        </div>
        <div className="md:w-[450px] w-full">
          <div className="flex flex-col ">
            <div>
              <div className="text-2xl gap-4 flex items-center  font-semibold py-5">
                <h1 className="text-gray-500 ">
                  CART <span className="text-gray-900">TOTALS</span>
                </h1>
                <span className="w-13 h-[2px] bg-black"></span>
              </div>
              <div className="flex items-center justify-between  p-2 ">
                <h1>Subtotal</h1>
                <div className="flex items-center ">
                  <FaRupeeSign />
                  <span>{getSubTotalPrice()}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border border-gray-300 border-x-0 p-2">
                <h1>Shipping Fee</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <span>
                    {cartItems.length > 0 ? getTotalShippingFees() : 0}
                  </span>
                </div>
              </div>
              <div className="flex items-center font-semibold justify-between p-2  ">
                <h1>Total</h1>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <span>{getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="text-xl flex items-center  gap-4 font-bold py-6">
              <h1 className="text-gray-500">
                PAYMENT <span className="text-gray-900">METHOD</span>
              </h1>
              <span className=" h-0.5 w-13  bg-gradient-to-r from-gray-300 to-black"></span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Card Payment Option */}
              <div className="flex items-center gap-4 border group border-gray-300 p-4 rounded-lg w-full hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className={`w-4 h-4 border-2  border-gray-400 group-active:bg-green-300 rounded-full`}></div>
                <img
                  className="h-8"
                  src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg"
                  alt="Card Payment"
                />
              </div>

              {/* Cash on Delivery */}
              <div className="flex items-center group gap-4 border border-gray-300 p-4 rounded-lg w-full hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className={`w-4 h-4 border-2  border-gray-400 group-active:bg-gray-300 rounded-full`}></div>
                <p className="text-blue-600 font-semibold">Cash On Delivery</p>
              </div>
            </div>

            <button className="mt-6 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer w-full">
              PLACE AN ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
