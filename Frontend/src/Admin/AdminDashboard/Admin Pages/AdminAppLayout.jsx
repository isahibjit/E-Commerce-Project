import React, { useEffect, useState } from "react";
import axios from "axios";

import { Outlet, useNavigate } from "react-router-dom";

import Footer from "../../../AppLayout/Footer";
import AdminHeader from "../Admin Pages/AdminHeader";
import AdminBgTheme from "../DashboardComponents/AdminBgTheme";
import AdminSidebar from "../Admin Pages/AdminSidebar";
import AdminNotAuthorize from "../Admin Pages/AdminNotAuthorize";
import { toast } from "react-toastify";
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState();

// Default values shown

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/dashboard",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsLoading(false);
          setIsAuthorized(true);
          setAdmin(response.data.admin)
         
        }
        // console.log(response.data)
      } catch (error) {
        if (error.status === 401) {
          setIsLoading(false);
          setIsAuthorized(false);
          setErrorMessage(error.response.data.message);
        }
      }
    };
    fetchData();
  }, [navigate]);

  return isLoading ? (
<div className="h-screen text-center flex items-center justify-center"><Trefoil
  size="120"
  stroke="4"
  strokeLength="0.15"
  bgOpacity="0.1"
  speed="1.4"
  color="blue" 
/></div>
  ) : !isAuthorized ? (
    <AdminNotAuthorize error={errorMessage} />
  ) : (
    <div className="min-h-[65vh]">
      <AdminBgTheme />
      <AdminHeader admin={admin} />
      <div className="flex ">
        <div className="md:w-[20%] w-16 ">
          <AdminSidebar />
        </div>
        <div className="w-full">
        <Outlet context={{ admin }} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
