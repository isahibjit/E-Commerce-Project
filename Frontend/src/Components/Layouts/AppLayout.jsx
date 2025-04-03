import React from "react";
import Header from "../Header";
import { ToastContainer, Bounce } from "react-toastify";
import BgTheme from "../BgTheme";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <>
      <BgTheme />
      <div className="max-w-[80%] mx-auto">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
