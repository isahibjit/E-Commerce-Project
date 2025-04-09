import React from "react";
import Header from "../../AppLayout/Header";
import { ToastContainer, Bounce } from "react-toastify";
import BgTheme from "../BgTheme";
import { Outlet } from "react-router-dom";
import Footer from "../../AppLayout/Footer";
const AppLayout = () => {
  return (
    <>
      {/* <BgTheme /> */}
      <div className="md:max-w-[81%] max-w-[90%]  mx-auto ">
        <Header />
        <Outlet />
      <Footer />
      </div>
    </>
  );
};

export default AppLayout;
