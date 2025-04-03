import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  return (
    <div className="text-md  font-medium text-gray-800  ">
      <div className=" justify-between items-center flex  py-4 mx-auto border border-x-0 border-t-0 border-gray-300 ">
        <div className="flex items-center">
          <img className="w-48 cursor-pointer" src={logo} alt="" />
        </div>
        <ul className="flex gap-5 ">
          <li className="relative group cursor-pointer">
            <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
              {({ isActive }) => (
                <>
                  <span>HOME</span>
                  <span
                    className={`h-[2px] ${
                      isActive
                        ? "w-full left-0"
                        : "left-[50%]  w-0 group-hover:w-full group-hover:left-0  "
                    }  rounded-lg bottom-0 absolute bg-blue-400 transition-all duration-300 `}
                  ></span>
                </>
              )}
            </NavLink>
          </li>
          <li className="relative group cursor-pointer">
            <NavLink to="/collection">
              {({ isActive }) => (
                <>
                  <span>COLLECTION</span>
                  <span
                    className={`h-[2px] ${
                      isActive
                        ? "w-full left-0"
                        : "left-[50%]  w-0 group-hover:w-full group-hover:left-0 "
                    } rounded-lg bottom-0 absolute bg-pink-400  transition-all duration-300 `}
                  ></span>
                </>
              )}
            </NavLink>
          </li>{" "}
          <li className="relative group cursor-pointer">
            <NavLink to="/about">
              {({ isActive }) => (
                <>
                  <span>ABOUT</span>
                  <span
                    className={`h-[2px] ${
                      isActive
                        ? "w-full left-0"
                        : "left-[50%] w-0  group-hover:w-full group-hover:left-0"
                    } rounded-lg bottom-0 absolute bg-yellow-400 transition-all duration-300  `}
                  ></span>
                </>
              )}
            </NavLink>
          </li>{" "}
          <li className="relative group cursor-pointer">
            <NavLink to="/contact">
              {({ isActive }) => (
                <>
                  <span>CONTACT</span>
                  <span
                    className={`h-[2px] ${
                      isActive
                        ? "w-full left-0"
                        : "left-[50%] w-0 group-hover:w-full group-hover:left-0 "
                    } rounded-lg bottom-0 absolute bg-green-400  transition-all duration-300 `}
                  ></span>
                </>
              )}
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/admin" target="_blank">
              <span className="px-2 py-1 bg-red-300 hover:bg-red-400 transition-all duration-200 rounded-lg">
                Admin Panel
              </span>
            </NavLink>
          </li>
        </ul>
        <div className="text-2xl flex gap-2">
          <span className="cursor-pointer hover:bg-pink-300 p-2 rounded-lg transition-all duration-200">
            <IoSearchOutline className=" " />
          </span>
          <NavLink
            to="/login"
            className="cursor-pointer hover:bg-pink-300 p-2 rounded-lg transition-all duration-200"
          >
            <span>
              <LuUserRound className=" " />
              
            </span>
          </NavLink>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn hover:bg-pink-300 p-2 text-black btn-ghost border-0 rounded-lg">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>{" "}
                </svg>
                <span class="badge badge-sm indicator-item">{cartCount}</span>
              </div>
            </div>
            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div class="card-body">
                <span class="text-lg text-white font-bold">
                  {cartCount} Items
                </span>
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setCartCount(cartCount + 1)}
        className="bg-blue-400 p-2 rounded-full text-white hover:bg-blue-400"
      >
        Click me
      </button>
    </div>
  );
};

export default Navbar;
