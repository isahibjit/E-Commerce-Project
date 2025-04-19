import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_API}api/user/forgot-password`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Reset link sent to your email.");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response?.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to connect to the server. Please try again.");
      }
      setError("email", {
        type: "manual",
        message: "Error sending reset link",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
  }, [errors]);

  return (
    <div className="h-[65vh] flex items-center justify-center bg-gradient-to-br p-4  border border-x-0 border-b-0 border-gray-400">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a reset link.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-gray-800"
        >
          <div>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Email address"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid Email Format",
                },
              })}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 flex items-center justify-center
              ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`}
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
              "Send Reset Link"
            )}
          </button>

          <div className="text-center pt-2">
            <NavLink
              to="/login"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              ← Back to Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
