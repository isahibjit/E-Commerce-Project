import React, { useEffect, useRef, useState } from "react";
import homeBg from "../assets/homeBg.jpg";
import Bestsellers from "./HomeComponents/Bestsellers.jsx";
import LatestCollections from "./HomeComponents/LatestCollections";
import { FaExchangeAlt } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {

  const location = useLocation();
  useEffect(() => {
    const shouldToastCart = sessionStorage.getItem("showEmptyCartToast");
    const shouldToastLogin = sessionStorage.getItem("showNotLoginToast")
    if (shouldToastCart === "true") {
      toast.info("Your Cart is Empty");
      sessionStorage.removeItem("showEmptyCartToast"); // prevent on reload
    }
    if(shouldToastLogin === "true"){
      toast.info("You're not logged in")
      sessionStorage.removeItem("showNotLoginToast")
    }
  }, [location.state]);

  return (
    <div>
      <div className="flex md:flex-row flex-col border    border-gray-300  bg-pink-50 ">
        <div className="md:w-1/2 flex  justify-center items-center ">
          <div className="flex flex-col  py-8">
            <div className="flex items-center gap-2">
              <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
              <span className=" font-medium text-sm md:text-base  text-gray-800 ">
                OUR BESTSELLERS
              </span>
            </div>
            <div className="">
              <h1 className="noto-serif-display leading-relaxed lg:text-5xl text-4xl  text-gray-600">
                Latest Arrivals
              </h1>
            </div>
            <div className="flex items-center justify-start gap-2">
              <h1 className=" font-semibold text-sm md:text-base    ">
                SHOP NOW
              </h1>
              <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={homeBg} alt="" className=" " />
        </div>
      </div>

      <div className="my-10">
        <div>
          <div className="text-3xl text-center p-4 ">
            <h1 className="text-gray-500 roboto-regular relative">
              LATEST{" "}
              <span className="text-slate-700 roboto-bold pr-3">
                COLLECTIONS
              </span>
              <span className="w-13 h-[2px] absolute rounded-lg bg-gray-800 top-[50%]"></span>
            </h1>
          </div>

          <p className="text-center text-gray-600">
            Discover the latest trends, unbeatable deals, and bold styles at
            ExtroBuy — your go-to destination for shopping that speaks loud and
            clear.
          </p>
        </div>

        <LatestCollections />
        <div className="bestsellers">
          <div className="text-3xl text-center p-4 ">
            <h1 className="text-gray-500 roboto-regular relative">
              🔥BEST{" "}
              <span className="text-slate-700 roboto-bold pr-3">SELLERS</span>
              <span className="w-13 h-[2px] absolute rounded-lg bg-gray-800 top-[50%]"></span>
            </h1>
          </div>

          <p className="text-center text-gray-600">
            Discover what everyone’s loving! From top-rated favorites to
            trending must-haves, our bestsellers are handpicked by your fellow
            shoppers. Whether you're here to treat yourself or find the perfect
            gift, these popular picks never disappoint.
          </p>
        </div>
        <Bestsellers />
        <div className="flex md:flex-row flex-col md:gap-4 gap-8 justify-around items-center shadow-md p-8 bg-[#fff] rounded-xl  md:max-w-[90%] mx-auto">
          <div className="flex flex-col gap-1 items-center ">
            <FaExchangeAlt className="md:text-4xl" />
            <h1 className="text-gray-800 font-semibold md:text-md text-sm ">
              Easy Exchange Policy
            </h1>
            <p className="text-gray-500 font-semibold text-center">
              We offer hassle free exchange policy
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <FaCheckDouble className="md:text-4xl" />
            <h1 className="text-gray-800 font-semibold md:text-md text-sm">7 Days Policy</h1>
            <p className="text-gray-500 font-semibold text-center">
              We provide 7 days free return policy
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <RiCustomerServiceFill className="md:text-4xl" />
            <h1 className="text-gray-800 font-semibold md:text-md text-sm">
              Best Customer Support
            </h1>
            <p className="text-gray-500 font-semibold text-center">
              We provide 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
