import { Children, lazy, useState } from "react";
import React from "react";
import "./App.css";

import CreateAccountForm from "./Authentication/CreateAccountForm.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout.jsx";
import withSuspense from "./utils/withSuspense.jsx";
const Home = lazy(() => import("./Pages/Home.jsx"));
const About = lazy(() => import("./Pages/About.jsx"));
const  Collection = lazy(()=> import( "./Pages/Collection.jsx"))
const  Contact = lazy(()=> import( "./Pages/Contact.jsx"))
const  Login = lazy(()=> import( "./Authentications/Login.jsx"))
const  AdminPanel = lazy(()=> import( "./Authentication/AdminPanel.jsx"))
const  AdminDashboard = lazy(()=> import( "./Admin/AdminDashboard/AdminDashboard.jsx"))
const  AdminDashboardAddItems = lazy(()=> import( "./Admin/AdminDashboard/Admin Pages/AdminDashboardAddItems.jsx"))
const  AdminListItems = lazy(()=> import( "./Admin/AdminDashboard/Admin Pages/AdminListItems.jsx"))
const  ProductPage = lazy(()=> import( "./Pages/ProductsPage/ProductPage.jsx"))
const  Cart = lazy(()=> import( "./Cart/Cart.jsx"))
const  Checkout = lazy(()=> import( "./Cart/Checkout.jsx"))
const  ForgotPassword = lazy(()=> import( "./Authentications/ForgotPassword.jsx"))
const  ResetPassword = lazy(()=> import( "./Authentications/ResetPassword.jsx"))
const  Orders = lazy(()=> import( "./Orders/Orders.jsx"))
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(Home),
      },
      {
        path: "/about",
        element: withSuspense(About),
      },
      {
        path: "/collection",
        element: withSuspense(Collection),
      },
      {
        path: "/contact",
        element: withSuspense(Contact),
      },
      {
        path: "/signup",
        element: <CreateAccountForm />, // not lazy, no suspense needed
      },
      {
        path: "/login",
        element: withSuspense(Login),
      },
      {
        path: "/admin",
        element: withSuspense(AdminPanel),
      },
      {
        path: "/product/:id/:name",
        element: withSuspense(ProductPage),
      },
      {
        path: "/cart",
        element: withSuspense(Cart),
      },
      {
        path: "/checkout",
        element: withSuspense(Checkout),
      },
      {
        path: "/forgot-password",
        element: withSuspense(ForgotPassword),
      },
      {
        path: "/reset-password",
        element: withSuspense(ResetPassword),
      },
      {
        path: "/orders",
        element: withSuspense(Orders),
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: withSuspense(AdminDashboard),
    children: [
      {
        path: "add",
        element: withSuspense(AdminDashboardAddItems),
      },
      {
        path: "list-items",
        element: withSuspense(AdminListItems),
      },
    ],
  },
]);

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
