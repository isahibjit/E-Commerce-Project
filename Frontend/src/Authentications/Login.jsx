import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, Router, useNavigate } from "react-router-dom";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const Login = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${BACKEND_API}api/user/login`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Login Successfull");
        setLoading(false)
        window.location.href = "/";
      }
    } catch (error) {
      setLoading(false)
      console.log(error.response);
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else toast.error("Unable to connect to the server. Please try again.");
    }
  };
  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    }
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors]);

  return (
    <div className="flex flex-col items-center min-h-[65vh] justify-center ">
      <div className="relative">
        <h1 className="text-4xl  p-4 text-gray-800 font-serif text-center ">
          Login
        </h1>
        <span className="w-12 bg-black h-[2px] absolute bottom-8 left-30 "></span>
      </div>
      <form
        action=""
        className="flex flex-col gap-4 items-center text-gray-800 md:w-96 w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
       <div className="w-full">
       <input
          type="email"
          className="form-input"
          placeholder="Email"
          required
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Email Format",
            },
          })}
        />

       </div>
        <div className="flex flex-col justify-center gap-2  w-full">
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            {...register("password", {
              required: "Password is Required!",
              minLength: {
                value: 6,
                message: "Password must be within 6 letters",
              },
            })}
          />

          <div className="flex justify-between">
            <a href="/forgot-password" className="text-sm text-gray-900">
              Forgot your password?
            </a>
            <NavLink to="/signup" className="text-sm text-gray-900">
              Create Account
            </NavLink>
          </div>
        </div>
        <button
          type="submit"
          className="bg-black flex items-center justify-center  text-white py-2 cursor-pointer rounded-lg hover:bg-gray-950 transition-all duration-200  px-6 w-24"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
