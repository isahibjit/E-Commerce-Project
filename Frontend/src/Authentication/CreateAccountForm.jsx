import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const CreateAccountForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_API}api/user/register`,
        data,
        {withCredentials : true}
      );
      console.log(response);
      if (response.status === 201) {
        setLoading(false);
        // Delay redirect by 1.5 seconds to allow toast to appear
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        toast.success("Registeration Successful!");
      }
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
        setLoading(false);
      } else toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
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
    <div className="flex flex-col min-h-[65vh] items-center">
      <div className="relative">
        <h1 className="text-4xl p-4 text-gray-800  font-serif text-center ">
          Sign Up
        </h1>
        <span className="w-12 bg-black h-[2px] absolute bottom-8 left-36 "></span>
      </div>
      <form
        action=""
        className="flex   flex-col gap-4 items-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="form-input"
          placeholder="Name"
          {...register("name", {
            required: "Name is Required",
            minLength: {
              value: 3,
              message: "Name must be atleast 3 characters!",
            },
          })}
        />

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

        <div className="flex flex-col justify-center gap-2">
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
            <a
              href="/forgot-password"
              className="text-sm hover:underline text-gray-900"
            >
              Forgot your password?
            </a>
            <NavLink
              to="/login"
              className="hover:underline  text-sm text-gray-900"
            >
              Login Here
            </NavLink>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-lg cursor-pointer text-white font-semibold transition-all duration-200 flex items-center justify-center
              ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
          disabled={loading}
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
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
