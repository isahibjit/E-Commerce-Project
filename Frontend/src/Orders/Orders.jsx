import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

const Orders = () => {
  const { user } = useContext(UserContext);

  return user.login ? (
    <section className="min-h-[65vh] border border-x-0 border-b-0 border-gray-400 px-4 sm:px-8">
      <header className="py-6">
        <div className="flex items-center gap-3 text-2xl font-semibold">
          <h1 className="text-gray-500">
            MY <span className="text-gray-900">ORDERS</span>
          </h1>
          <div className="h-[2px] w-14 bg-black" />
        </div>
      </header>

      <article className=" border-gray-300 border border-x-0 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/sunnysingh78376/image/upload/c_fit,q_auto,w_200,h_300/v1743761910/txnrnwajzyn41u3r1zrs.webp"
                alt="Product"
                className="object-cover w-28 h-28 sm:w-32 sm:h-32"
              />
            </div>

            <div className="flex flex-col justify-center gap-1">
              <h2 className="font-semibold">
                Women's Cute Dress You'll Love It
              </h2>
              <div className="flex flex-wrap gap-3 text-sm text-gray-700 font-medium">
                <span>$64</span>
                <span>Quantity: 1</span>
                <span>Size: XL</span>
              </div>
              <p className="font-medium text-sm">
                Date: <span className="text-gray-500">Thu April 10 2025</span>
              </p>
              <p className="font-medium text-sm">
                Payment: <span className="text-gray-500">COD</span>
              </p>
            </div>
          </div>
          <div className="flex md:w-1/2 w-full  justify-between">
            <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Shipped</span>
            </div>

            <div>
              <button className="border border-gray-300 px-4 py-2 cursor-pointer rounded-sm text-sm text-gray-700 hover:text-gray-900 hover:shadow-md hover:scale-105 active:scale-100 transition-all duration-200">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  ) : (
    <div className="min-h-[65vh] flex-col flex items-center gap-8 justify-center animate-fade-in">
      <p className="text-3xl font-bold text-red-600 animate-pulse">
        You're not logged in!
      </p>
      <div >
        <a href="/login">
        <button className="text-xl h-12 relative flex w-32 px-15 items-center justify-between  from-pink-300 to-pink-700 bg-gradient-to-tr hover:bg-gradient-to-tl active:scale-110 transition-all duration-200 shadow-md text-white font-semibold  py-2 cursor-pointer  rounded-full">
         <span className="text-4xl py-1  h-12 rounded-full px-1  absolute  left-0
         "><CiLogin size={40} />
         </span> 
         <span>Login</span>
        </button>
        </a>
      </div>
    </div>
  );
};

export default Orders;
