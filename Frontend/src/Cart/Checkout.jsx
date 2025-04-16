import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CartContext } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import { toast } from "react-toastify";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const Checkout = () => {
  const { cartItems, getTotalPrice, getSubTotalPrice, getTotalShippingFees } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [useStripe, setUseStripe] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user.login) {
      sessionStorage.setItem("showNotLoginToast", "true");
      navigate("/", { replace: true });
      window.scrollTo(0, 0);
    }
  }, [user]);
  useEffect(() => {
    if (cartItems.length === 0) {
      sessionStorage.setItem("showEmptyCartToast", "true");
      navigate("/", { replace: true });
    }
  }, [cartItems]);

  const onSubmit = async (data) => {
    if (useStripe) {
      const products = cartItems.map(
        ({ product_description, ...rest }) => rest
      );
      data.cart = products;
      console.log("Form Data Submitted for stripe:", data);
      try {
        setLoading(true);
        const response = await axios.post(
          `${BACKEND_API}api/stripe/create-checkout-session`,
          data,
          { withCredentials: true }
        );
        if (response.data?.url) {
          window.location.href = response.data.url;
          setLoading(false);
        }
        console.log(response.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setLoading(true);
      try {
        let formData = {};
        const products = cartItems.map(
          ({ product_description, ...rest }) => rest
        );
        const cartData = {
          totalAmount: getTotalPrice(),
          totalShippingFee: getTotalShippingFees(),
        };
        console.log("cartdata totalAmount",cartData.totalAmount)
        formData.userData = data;
        formData.cartData = products;
        formData.paymentInfo = cartData;
        const response = await axios.post(`${BACKEND_API}api/orders`, formData, {
          withCredentials: true,
        });
        if (response.status === 201) {
          setLoading(false);
          localStorage.removeItem("cart");
          navigate("/orders");
          toast.success("Order Placed Succesfully !")
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">
            DELIVERY <span className="text-gray-900">INFORMATION</span>
          </h1>
          <div className="mt-2 h-1 w-24 bg-gray-900 mx-auto rounded-full"></div>
        </div>

        {/* Single Form enclosing both Delivery Details and Cart Summary */}
        <form
          id="orderForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Delivery Details Section */}
          <div className="flex-1  rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  {...register("firstName", {
                    required: "First Name required",
                  })}
                  type="text"
                  placeholder="First Name"
                  className={`w-full py-2 px-3 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  {...register("lastName", { required: "Last Name required" })}
                  type="text"
                  placeholder="Last Name"
                  className={`w-full py-2 px-3 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|((".+")))\@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Email Address"
                className={`w-full py-2 px-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("street", { required: "Street required" })}
                type="text"
                placeholder="Street"
                className={`w-full py-2 px-3 border ${
                  errors.street ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  {...register("city", { required: "City required" })}
                  type="text"
                  placeholder="City"
                  className={`w-full py-2 px-3 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  {...register("state", { required: "State required" })}
                  type="text"
                  placeholder="State"
                  className={`w-full py-2 px-3 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  {...register("pincode", { required: "Pincode required" })}
                  type="text"
                  placeholder="Pincode"
                  className={`w-full py-2 px-3 border ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  {...register("country", { required: "Country required" })}
                  type="text"
                  placeholder="Country"
                  className={`w-full py-2 px-3 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register("phone", { required: "Phone number required" })}
                type="tel"
                placeholder="Phone"
                className={`w-full py-2 px-3 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Payment Options */}
            <div className="mt-6">
              <div className="text-lg font-semibold text-gray-700 mb-3">
                PAYMENT <span className="text-gray-900">METHOD</span>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <label
                  onClick={() => setUseStripe(true)}
                  className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-300"
                >
                  <input
                    {...register("paymentMode", {
                      required: "Select a payment method",
                    })}
                    type="radio"
                    value="STRIPE"
                    className="w-4 h-4 border-gray-400 accent-indigo-600"
                  />
                  <img
                    className="h-8"
                    src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg"
                    alt="Card Payment"
                  />
                </label>

                <label
                  onClick={() => setUseStripe(false)}
                  className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-300"
                >
                  <input
                    {...register("paymentMode", {
                      required: "Select a payment method",
                    })}
                    type="radio"
                    value="COD"
                    className="w-4 h-4 border-gray-400 accent-indigo-600"
                  />
                  <span className="text-blue-600 font-semibold">
                    Cash On Delivery
                  </span>
                </label>
              </div>
              {errors.paymentMode && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.paymentMode.message}
                </p>
              )}
            </div>
          </div>

          {/* Cart Summary Section inside the same form */}
          <div className="w-full md:w-[450px]  rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                CART <span className="text-gray-900">TOTALS</span>
              </h2>
              <div className="h-1 w-16 bg-gray-900 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <div className="flex items-center">
                  <FaRupeeSign className="text-gray-600" />
                  <span className="ml-1 text-gray-700">
                    {getSubTotalPrice()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-b border-gray-200 py-2">
                <span className="text-gray-600">Shipping Fee</span>
                <div className="flex items-center">
                  <FaRupeeSign className="text-gray-600" />
                  <span className="ml-1 text-gray-700">
                    {cartItems.length > 0 ? getTotalShippingFees() : 0}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <div className="flex items-center">
                  <FaRupeeSign className="text-gray-800" />
                  <span className="ml-1 text-gray-800">{getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Cart Summary Section */}
        </form>

        {/* Place Order Button outside the flex row but inside the form container */}
        <div className="mt-8 text-center ">
          <button
            type="submit"
            form="orderForm"
            className="w-full max-w-sm flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition-colors duration-300 shadow-md mx-auto"
          >
            {" "}
            {loading ? (
              <svg
                className="animate-spin h-8 text-white"
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
              <p>PLACE AN ORDER</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
