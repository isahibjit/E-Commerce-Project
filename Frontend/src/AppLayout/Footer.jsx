import React from "react";
import logo from "../assets/logo.png";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div>

    <div className="md:flex md:flex-row  flex-col justify-center">
      <div className="md:w-1/2  flex flex-col py-8  ">
        <img className="w-48 cursor-pointer" src={logo} alt="" />
        <p className="text-gray-500 pl-4 text-sm poppins-regular">
          At ExtroBuy, fashion isn't just about what you wear — it's about
          expressing your boldest, truest self. We bring you trend-forward,
          quality clothing for every vibe — from casual comfort to statement
          pieces that turn heads. Whether you're revamping your wardrobe or
          looking for that one standout outfit, ExtroBuy has you covered.
        </p>
      </div>
      <div className="md:w-1/2   md:flex md:flex-row flex-col pl-4 md:gap-4 py-2 justify-center">
        <div className="flex  w-1/2 flex-col justify-center">
          <h1 className="text-gray-800 text-2xl font-semibold">Company</h1>
          <div>
            <ul className="text-gray-500 flex flex-col items-start gap-1 ">
              <a href="/"><li className="cursor-pointer hover:underline">Home</li></a>
              <a href="/about"><li className="cursor-pointer hover:underline">About us</li></a>
              <a href="/collection"><li className="cursor-pointer hover:underline">Collection</li></a>
              <a href="/contactus"><li className="cursor-pointer hover:underline">Contact Us</li></a>
            </ul>
          </div>
        </div>
        <div className="flex w-2/3  flex-col  justify-center">
          <h1 className="text-gray-800 text-2xl font-semibold">Get In Touch</h1>
          <div >
            <ul className="text-gray-500 flex flex-col  items-start gap-1 ">
              <li className="cursor-pointer hover:underline">+917837659748</li>
              <li className="cursor-pointer hover:underline">
                sahibjitsinghramgharia@gmail.com
              </li>
              <li className="cursor-pointer hover:underline">
                <a
                  href="https://github.com/isahibjit/E-Commerce-Project"
                  target="_blank"
                  className="flex gap-1 group"
                  >
                  <span className="group-hover:text-black md:text-2xl">
                    <FaGithub />
                  </span>
                  <span className="group-hover:text-black">Github</span>
                </a>
              </li>
              <li className="cursor-pointer hover:underline">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
    <hr className="text-gray-300" />
    <div className="py-4">
    <h1 className="font-semibold text-center">&copy; Copyright 2025 All rights reserved; Developed by Sahibjit Singh</h1>
    </div>
    </div>
  );
};

export default Footer;
