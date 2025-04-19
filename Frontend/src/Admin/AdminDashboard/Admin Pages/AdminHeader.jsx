import React, { useState } from "react";
import adminLogo from "../../../assets/adminLogo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const AdminHeader = ({ admin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${BACKEND_API}api/admin/logout`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsLoading(false)
        navigate("/admin");
        toast.success(response.data.message);

      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };
  return (
    <div className="border-[1px] border-gray-300">
      <div className="flex   flex-wrap navbar-start w-[80%]  mx-auto items-center justify-between">
        <img src={adminLogo} className="w-40 md:w-52" alt="Admin Logo" />
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold text-rose-700 md:block hidden">
            {admin.email}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-secondary rounded-full mt-2 sm:mt-0 w-21"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-8 text-black"
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
      </div>
    </div>
  );
};

export default AdminHeader;
