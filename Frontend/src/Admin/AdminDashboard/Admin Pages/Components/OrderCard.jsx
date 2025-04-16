import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const OrderCard = ({ order }) => {
  const {
    order_id,
    first_name,
    last_name,
    product_names,
    quantities,
    sizes,
    total_amount,
    payment_method,
    order_status,
    payment_status,
    created_at,
    pincode,
  } = order;
  const BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      order_status: order_status,
    },
  });

  const productDetails = product_names.map((name, index) => ({
    name,
    quantity: quantities[index],
    size: sizes[index],
  }));

  const formattedDate = new Date(created_at).toLocaleDateString("en-GB");

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setValue("order_status", newStatus);

    try {
      const response = await axios.put(
        `${BACKEND_API}api/orders/updateOrder/${order_id}`,
        {
          order_status: newStatus,
        },
        { withCredentials: true }
      );
      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="border-[1px] my-8 border-gray-400 rounded-md shadow p-4 bg-white">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left Side */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
            <img
              src="data:image/svg+xml,%3csvg%20width='73'%20height='73'%20viewBox='0%200%2073%2073'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.5'%20y='0.5'%20width='72'%20height='72'%20fill='%23F9FAFB'%20stroke='%23D2D2D2'/%3e%3cpath%20d='M41.1484%2037.4871L38.6348%2038.9418V65.0908L61.2694%2052.0221V25.873L41.1484%2037.4871Z'%20fill='%23565656'/%3e%3cpath%20d='M45.247%2014.039L36.5423%209L13.2793%2022.4295L21.9956%2027.4684L45.247%2014.039Z'%20fill='%23565656'/%3e%3cpath%20d='M59.7945%2022.4307L49.7631%2016.7168L26.5117%2030.1463L27.8384%2030.8329L36.5431%2035.8602L45.2013%2030.8678L59.7945%2022.4307Z'%20fill='%23565656'/%3e%3cpath%20d='M24.7545%2039.7573L20.5883%2037.6161V30.9595L12%2026.0137V51.9765L34.4717%2064.9521V38.9893L24.7545%2033.3917V39.7573Z'%20fill='%23565656'/%3e%3c/svg%3e"
              alt="Package"
              className="w-18 h-18"
            />
          </div>

          <div className="text-sm space-y-1">
            {productDetails.map((product, index) => (
              <p key={index}>
                <span className="font-medium">{product.name}</span> x{" "}
                {product.quantity} {product.size},
              </p>
            ))}
            <p className="font-semibold mt-2">
              {first_name} {last_name}
            </p>
            <p>Pin code: {pincode}</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="text-sm space-y-1 min-w-[150px]">
          <p>
            <span className="font-medium">Items:</span>{" "}
            {quantities.reduce((a, b) => a + b, 0)}
          </p>
          <p>
            <span className="font-medium">Total:</span> ₹{total_amount}
          </p>
          <p>
            <span className="font-medium">Method:</span>{" "}
            {payment_method.toUpperCase()}
          </p>
          <p>
            <span className="font-medium">Payment:</span> {payment_status}
          </p>
          <p>
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
        </div>

        {/* Status Dropdown */}
        <div>
          <select
            {...register("order_status")}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option>Order Placed</option>
            <option>Packing</option>
            <option>Shipped</option>
            <option>Out for delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
