// Success.jsx
import React, { useContext, useEffect, useState } from "react";
import successBg from "../assets/successBg.png";

import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Contexts/CartContext";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const Success = () => {
  const { cartItems, getTotalShippingFees } = useContext(CartContext);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");
      if (!sessionId) {
        setError("Session ID missing from URL.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${BACKEND_API}api/stripe/check-payment?session_id=${sessionId}`
        );
        const data = res.data;
        console.log(data);
        if (data.payment_status === "paid") {
          try {
            const cartData = {
              totalAmount: (data.total_amount || 0) / 100,
              totalShippingFee: getTotalShippingFees(),
            };
            data.paymentInfo = cartData;
            data.cartData = cartItems;
            const response = await axios.post(
              `${BACKEND_API}api/orders`,
              data,
              { withCredentials: true }
            );
            if (response.status === 201) {
              setSessionData(data);
              setLoading(false);
              localStorage.removeItem("cart");
            }
          } catch (error) {
            console.log("this is error", error);
          }
        } else {
          setError("Payment was not completed.");
        }
      } catch (err) {
        setLoading(false);
        console.error("❌ Error checking payment:", err.message);
        setError("An error occurred while verifying payment.");
      }
    };

    fetchPaymentStatus();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex md:flex-row flex-col border border-gray-300 bg-green-100">
        <div className="md:w-1/2 flex justify-center items-center py-10">
          <div className="flex flex-col gap-4 text-center">
            <FaCheckCircle className="text-green-600 text-6xl mx-auto" />
            <h1 className="text-4xl font-semibold text-gray-700">
              Payment {sessionData ? "Successful 🎉" : "Status"}
            </h1>

            {loading ? (
              <div>
                <TailChase size="40" speed="1.75" color="green" />
                <p className="text-gray-600">Checking payment status...</p>
              </div>
            ) : sessionData ? (
              <div className="text-gray-600">
                <p>
                  <strong>Amount:</strong> ₹
                  {(sessionData.total_amount || 0) / 100}
                </p>
                <p>
                  <strong>Email:</strong> {sessionData.customer_email}
                </p>
                <Link to="/orders">
                  <button className="mt-4 text-2xl font-semibold bg-pink-400 py-2 px-4 rounded-lg text-white hover:scale-110 hover:bg-pink-500 transition-all duration-200 cursor-pointer">
                    Go to Orders
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-red-500">{error}</p>
                <Link to="/">
                  <button className="mt-4 text-lg font-semibold bg-gray-400 py-2 px-4 rounded-lg text-white hover:bg-gray-500 transition-all duration-200">
                    Back to Home
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto/w_800/v1743870766/ChatGPT_Image_Apr_16_2025_09_44_30_PM_vxelpm.png"
            alt="Success"
            className="w-full h-full object-cover object-top "
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
