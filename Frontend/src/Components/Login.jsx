import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, Router } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        data
      ,{withCredentials : true});
      if (response.status === 200) {
        toast.success("Login Successfull");
      
      }
    }  catch (error) {
            console.log(error.response)
            if(error.response.data){
              toast.error(error.response.data.message)
            }
            else
              toast.error("Unable to connect to the server. Please try again.");
          
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
    <div className="flex flex-col items-center lg:p-32 ">
      <div className="relative">
        <h1 className="text-4xl  p-4 text-gray-800 font-serif text-center ">
          Login
        </h1>
        <span className="w-12 bg-black h-[2px] absolute bottom-8 left-30 "></span>
      </div>
      <form
        action=""
        className="flex    flex-col gap-4 items-center text-gray-800 "
        onSubmit={handleSubmit(onSubmit)}
      >
       

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
            <a href="" className="text-sm text-gray-900">
              Forgot your password?
            </a>
            <NavLink to="/signup" className="text-sm text-gray-900">
              Create Account
            </NavLink>
          </div>
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 cursor-pointer rounded-lg hover:bg-gray-950 transition-all duration-200  px-6 w-fit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
