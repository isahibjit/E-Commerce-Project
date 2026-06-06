import React from "react";
import { downloadInvoice } from "../utils/downloadInvoice";

const OrderCard = ({
  orderId,
  productName,
  productImgUrl,
  productQuantity,
  orderStatus,
  productSize,
  productTotalAmount,
  paymentMethod,
  paymentStatus,
  orderDate,
  productId,
}) => {
  const BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const date = new Date(orderDate);
  const orderDateFormatted = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDownloadInvoice = async () => {
    try {
      await downloadInvoice({ backendApi: BACKEND_API, orderId });
    } catch (error) {
      console.error("Failed to download invoice:", error);
    }
  };

  return (
    <article className=" border-gray-300 border border-x-0 py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4">
          <a href={`product/${productId}/${productName}`}>
            <div className="rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-110 ">
              <img
                src={`https://res.cloudinary.com/sunnysingh78376/image/upload/c_fit,q_auto,w_200,h_300/v1743761910/${productImgUrl}`}
                alt="Product"
                className="object-cover w-28 h-28 sm:w-32 sm:h-32"
              />
            </div>
          </a>
          <div className="flex flex-col justify-center gap-1">
            <h2 className="font-semibold">{productName}</h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700 font-medium">
              <span>Rs. {productTotalAmount}</span>
              <span>Quantity: {productQuantity}</span>
              <span>Size: {productSize}</span>
            </div>
            <p className="font-medium text-sm">
              Date: <span className="text-gray-500">{orderDateFormatted}</span>
            </p>
            <p className="font-medium text-sm">
              Payment: <span className="text-gray-500">{paymentMethod}</span>
            </p>
            <p className="font-medium text-sm">
              Status: <span className="text-gray-500">{paymentStatus}</span>
            </p>
          </div>
        </div>
        <div className="flex md:w-1/2 w-full justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span>{orderStatus}</span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDownloadInvoice}
              className="border border-gray-300 px-4 py-2 cursor-pointer rounded-sm text-sm text-gray-700 hover:text-gray-900 hover:shadow-md hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Download Invoice
            </button>
            <button
              type="button"
              className="border border-gray-300 px-4 py-2 cursor-pointer rounded-sm text-sm text-gray-700 hover:text-gray-900 hover:shadow-md hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
