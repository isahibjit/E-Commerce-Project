import React, { useEffect, useState } from "react";
import axios from "axios";
import adminLogo from "../../assets/adminLogo.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/dashboard",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsAuthorized(true);
        }
        // console.log(response.data)
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isAuthorized ? (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="text-black ">
        <div className="border-[1px] border-gray-300">

        <div className="flex   flex-wrap navbar-start w-[80%]  mx-auto items-center justify-between">
          <img src={adminLogo} className="w-40 md:w-52" alt="Admin Logo" />
          <button className="btn btn-secondary rounded-full mt-2 sm:mt-0">
            Logout
          </button>
        </div>
        </div>
        <div className="flex   gap-4">
        <div className="sidebar md:w-[20%] w-24    border-[1px] border-t-0 border-gray-300 h-[100vh] shadow-lg">
          <ul className="flex flex-col text-lg  items-end py-5 gap-3  mx-auto">
                <NavLink  className={({isActive})=>isActive ? "bg-blue-400 transition-all duration-200 admin-dashboard-list" : "admin-dashboard-list"} to="/admin/dashboard/add" >
            <li className="">
              <div className="admin-item">
                <IoIosAddCircleOutline className="text-2xl" />
                <span className="hidden md:block">Add Items</span>
              </div>
            </li>
                </NavLink>
            <li className="admin-dashboard-list">
              <div className="admin-item">
                <FaListUl className="text-xl" />
                <span className="hidden md:block">List Items</span>
              </div>
            </li>
            <li className="admin-dashboard-list">
              <div className="admin-item">
                <BsListCheck className="text-2xl " />
                <span className="hidden md:block">Orders</span>
              </div>
            </li>
          </ul>
        </div>
      <Outlet />
      </div>
      </div>
    </>
  ) : (
    <div>You are not authorized to Visit Here Login again</div>
  );
};

export default AdminDashboard;
