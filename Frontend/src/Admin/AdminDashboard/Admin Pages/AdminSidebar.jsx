import React from 'react'
import { NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";

const AdminSidebar = () => {
  return (
    <div className="sidebar h-screen  border-[1px] border-t-0 border-gray-300  shadow-lg">
          <ul className="flex flex-col text-lg  items-end py-5 gap-3  mx-auto">
                <NavLink  className={({isActive})=>isActive ? "bg-blue-400 transition-all duration-200 admin-dashboard-list" : "admin-dashboard-list"} to="/admin/dashboard/add" >
            <li className="">
              <div className="admin-item">
                <IoIosAddCircleOutline className="text-2xl" />
                <span className="hidden md:block">Add Items</span>
              </div>
            </li>
                </NavLink>

                <NavLink className={({isActive})=>isActive ? "bg-blue-400 transition-all duration-200 admin-dashboard-list" : "admin-dashboard-list"} to="/admin/dashboard/list-items" >
            <li className="">
              <div className="admin-item">
                <FaListUl className="text-xl" />
                <span className="hidden md:block">List Items</span>
              </div>
            </li>
            </NavLink>
            <li className="admin-dashboard-list">
              <div className="admin-item">
                <BsListCheck className="text-2xl " />
                <span className="hidden md:block">Orders</span>
              </div>
            </li>
          </ul>
        </div>
  )
}

export default AdminSidebar