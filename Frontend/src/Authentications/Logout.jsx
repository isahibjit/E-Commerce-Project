import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/logout",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsLoading(false);
        window.location.href = "/";
        toast.success(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="from-[#FF4C4C] to-[#D63031] bg-gradient-to-r  hover:from-[#D63031] hover:to-[#FF4C4C] focus:outline-none focus:ring-2 focus:ring-red-500
      p-2 rounded-lg  cursor-pointer transition-colors duration-200 btn-block flex items-center justify-center"
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default Logout;
