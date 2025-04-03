import { Children, useState } from "react";
import React from "react";
import "./App.css";

import CreateAccountForm from "./Components/SignUp/CreateAccountForm.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Components/Layouts/AppLayout.jsx";
import Home from "./Components/HeaderPages/Home.jsx";
import About from "./Components/HeaderPages/About.jsx"
import Collection from "./Components/HeaderPages/Collection.jsx";
import Contact from "./Components/HeaderPages/Contact.jsx";
import Login from "./Components/Login.jsx";
import AdminPanel from "./Components/SignUp/AdminPanel.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import AdminDashboardAddItems from "./Components/AdminDashboard/AdminDashboardAddItems.jsx";
const router = createBrowserRouter([
  {
    path : "/",
    element : <AppLayout />,
    children :[{
      path : "/",
      element : <Home />
    },
  {
    path : "/about",
    element : <About />
  },
  {
    path : "/collection",
    element : <Collection />
  },
  {
    path : "/contact",
    element  : <Contact />
  },
  {
    path : "/signup",
    element : <CreateAccountForm />
  },
  {
    path : "/login",
    element : <Login />
  },{
    path : "/admin",
    element : <AdminPanel />
  }
  ]
  },{
    path : "/admin/dashboard",
    element : <AdminDashboard />,
    children : [{
      path : "add",
      element : <AdminDashboardAddItems />
    }]
  }
  
])

function App() {
  return (
    <>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
    <RouterProvider router={router} />
    </>
  );
}

export default App;
