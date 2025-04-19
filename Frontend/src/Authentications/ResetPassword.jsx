import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  if (!token) {
    window.location.href = "/";
  }
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or expired reset link.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_API}api/user/reset-password`,
        {
          password: data.password,
          token: token,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password has been reset successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error)
    }
  };

  useEffect(() => {
    if (errors.password) toast.error(errors.password.message);
    if (errors.confirmPassword) toast.error(errors.confirmPassword.message);
  }, [errors]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">New Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center">
          <NavLink
            to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
