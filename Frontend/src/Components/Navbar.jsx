import React,{useState} from "react";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";

const Navbar = () => {

    const [cartCount, setCartCount] = useState(0)
  return (
    <div className="text-md  font-medium text-gray-800  ">
      <div className=" justify-between items-center flex  py-4 mx-auto border border-x-0 border-t-0 border-gray-300 ">
        <div className="flex items-center">
          <img className="w-48 cursor-pointer" src={logo} alt="" />
        </div>
        <ul className="flex gap-5 ">
          <li className="relative group cursor-pointer">
            <a href="">
              <span>HOME</span>
              <span className="h-[2px] rounded-lg bottom-0 absolute bg-blue-400 left-[50%] w-0 transition-all duration-300 group-hover:w-full group-hover:left-0 "></span>
            </a>
          </li>
          <li className="relative group cursor-pointer">
            <a href="">
              <span>COLLECTION</span>
              <span className="h-[2px] rounded-lg bottom-0 absolute bg-pink-400 left-[50%] w-0 transition-all duration-300 group-hover:w-full group-hover:left-0 "></span>
            </a>
          </li>{" "}
          <li className="relative group cursor-pointer">
            <a href="">
              <span>ABOUT</span>
              <span className="h-[2px] rounded-lg bottom-0 absolute bg-yellow-400 left-[50%] w-0 transition-all duration-300 group-hover:w-full group-hover:left-0 "></span>
            </a>
          </li>{" "}
          <li className="relative group cursor-pointer">
            <a href="">
              <span>CONTACT</span>
              <span className="h-[2px] rounded-lg bottom-0 absolute bg-green-400 left-[50%] w-0 transition-all duration-300 group-hover:w-full group-hover:left-0 "></span>
            </a>
          </li>
        </ul>
        <div className="text-2xl flex gap-2">
          <span className="cursor-pointer hover:bg-pink-300 p-2 rounded-lg transition-all duration-200">
            <IoSearchOutline className=" " />
          </span>
          <span className="cursor-pointer hover:bg-pink-300 p-2 rounded-lg transition-all duration-200">
            <LuUserRound className=" " />
          </span>
          <div className="cursor-pointer relative hover:bg-pink-300 p-2 rounded-lg transition-all duration-200">
            <BiShoppingBag className=" " />
            <span className="p-1 right-0 w-5 flex items-center justify-center h-5 absolute bottom-0 rounded-full   bg-black text-white ">
              <span className="text-[10px]">{cartCount}</span>
            </span>
          </div>
        </div>
      </div>
      <button onClick={()=>setCartCount(cartCount + 1)} className="bg-blue-400 p-2 rounded-full text-white hover:bg-blue-400">Click me</button>
    </div>
  );
};

export default Navbar;
