import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";

import { Link, NavLink } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { CartContext } from "../Contexts/CartContext";
import { UserContext } from "../Contexts/UserContext";
import Logout from "../Authentications/Logout.jsx";
import { SearchContext } from "../Contexts/SearchContext";

const Navbar = () => {
  const [hamburgerClicked, sethamburgerClicked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { cartItems, getSubTotalPrice } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { setShowSearch } = useContext(SearchContext);




   // ✅ Fixing the useEffect for viewport width handling
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        document.body.style.overflowX = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    console.log("Window resized:", window.innerWidth);
    handleResize(); // Check once on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto"; // Restore when component unmounts
    };
  }, []);

  return (
    <div className="text-sm  font-medium text-gray-800  ">
      <div className=" justify-between items-center flex   py-2 mx-auto  ">
        <div className="flex items-center ">
         <Link to="/">
          <img className="w-48   cursor-pointer" src={logo} alt="logo extrobuy shop bold. live loud" />
         </Link>
        </div>
        <ul className="lg:flex hidden gap-5  ">
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
        <div
          onClick={() => setShowSearch((prev) => !prev)}
          className="text-2xl flex items-center gap-2"
        >
          <span className="cursor-pointer hover:bg-pink-300 p-2 rounded-lg transition-all duration-200">
            <IoSearchOutline />
          </span>

          {user?.login ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <div
                tabIndex="0"
                role="button"
                className="btn hover:bg-pink-300 p-2 text-black btn-ghost border-0 rounded-lg"
              >
                <div className="indicator">
                  <LuUserRound className="text-2xl" />
                </div>
              </div>
              <div
                tabIndex="0"
                className="card card-compact dropdown-content bg-base-100 z-1 mt-0 w-52 shadow"
              >
                <div className="card-body">
                  <div className="card-actions">
                    <Logout />
                  </div>
                  <Link to="/orders">
                    <div className="card-actions">
                      <button className=" bg-yellow-400 p-2 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2  btn-block cursor-pointer transition-colors duration-200 btn-block">
                        View Orders
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <span className="btn hover:bg-pink-300 p-2 text-black btn-ghost border-0 rounded-lg">
                {" "}
                <LuUserRound className="text-2xl" />
              </span>
            </Link>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost hover:bg-pink-300 p-2 rounded-lg border-0"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm bg-black text-white indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>

            <div
              tabIndex="0"
              className="dropdown-content z-10 mt-3 w-64 rounded-lg shadow-lg bg-white"
            >
              <div className="p-4 space-y-4">
                <span className="text-lg font-semibold block text-center">
                  {cartItems.length} Items
                </span>
                <div className="text-center text-xl text-blue-600">
                  Subtotal: ₹{getSubTotalPrice()}
                </div>
                <div className="flex justify-center">
                  <a href="/cart" className="w-full">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-medium py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">
                      View Cart
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <span
            onClick={() => sethamburgerClicked(true)}
            className="cursor-pointer  lg:hidden block hover:bg-pink-300 p-2 rounded-lg transition-all duration-200"
          >
            <CiMenuFries />
          </span>
        </div>
      </div>
      <button
        onClick={() => setCartCount(cartCount + 1)}
        className="bg-blue-400 p-2 hidden rounded-full text-white hover:bg-blue-400"
      >
        Click me
      </button>

      <div className="overflow-x-hidden ">
        <div
          className={`md:hidden overflow-x-hidden fixed top-0 right-0 w-full h-full transition-transform duration-300 bg-white z-50 ${
            hamburgerClicked
              ? "translate-x-0"
              : "translate-x-full pointer-events-none opacity-0"
          }`}
        >
          <button
            onClick={() => sethamburgerClicked(false)}
            className=" cursor-pointer w-fit flex items-center text-gray-600  gap-2 hover:text-gray-900 text-2xl"
          >
            <IoIosArrowBack />
            <span>Back</span>
          </button>

          <ul className="flex flex-col   gap-8 text-xl max-w-96 px-4  mx-auto mt-8  ">
            <li
              onClick={() => sethamburgerClicked(false)}
              className="relative group cursor-pointer"
            >
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "" : "")}
              >
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
            <li
              onClick={() => sethamburgerClicked(false)}
              className="relative group cursor-pointer"
            >
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
            <li
              onClick={() => sethamburgerClicked(false)}
              className="relative group cursor-pointer"
            >
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
            <li
              onClick={() => sethamburgerClicked(false)}
              className="relative group cursor-pointer"
            >
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
            <li
              onClick={() => sethamburgerClicked(false)}
              className="cursor-pointer"
            >
              <NavLink to="/admin" target="_blank">
                <span className="px-2 py-1 bg-red-300 hover:bg-red-400 transition-all duration-200 rounded-lg">
                  Admin Panel
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
