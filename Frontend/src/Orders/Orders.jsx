import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { CiLogin } from "react-icons/ci";
import axios from "axios";
import OrderCard from "./OrderCard";
import OrderCardSkeleton from "./OrderCardSkeleton";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, userLoading } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.login) return; // Avoid unnecessary fetch if not logged in
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BACKEND_API}api/orders/getOrders`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.log("Error Occurred:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user?.login]);
  console.log(orders);
  // Wait for user loading state
  if (userLoading) {
    return (
      <div className="min-h-[65vh] flex justify-center items-center">
        <p className="text-xl text-gray-500">Checking login status...</p>
      </div>
    );
  }

  // If not logged in
  if (!user?.login) {
    return (
      <div className="min-h-[65vh] flex-col flex items-center gap-8 justify-center animate-fade-in">
        <p className="text-3xl font-bold text-red-600 animate-pulse">
          You're not logged in!
        </p>
        <a href="/login">
          <button className="text-xl h-12 relative flex w-32 px-15 items-center justify-between bg-gradient-to-tr from-pink-300 to-pink-700 hover:bg-gradient-to-tl active:scale-110 transition-all duration-200 shadow-md text-white font-semibold py-2 cursor-pointer rounded-full">
            <span className="text-4xl py-1 h-12 rounded-full px-1 absolute left-0">
              <CiLogin size={40} />
            </span>
            <span>Login</span>
          </button>
        </a>
      </div>
    );
  }

  // If logged in
  return (
    <section className="min-h-[65vh] border border-x-0 border-b-0 border-gray-400 px-4 sm:px-8">
      <header className="py-6">
        <div className="flex items-center gap-3 text-2xl font-semibold">
          <h1 className="text-gray-500">
            MY <span className="text-gray-900">ORDERS</span>
          </h1>
          <div className="h-[2px] w-14 bg-black" />
        </div>
      </header>

      {isLoading ? (
        <>
       {Array.from({length : 8}).map((_, idx) => (
          <OrderCardSkeleton key={idx} />
        ))}
        
        </>
      ) : orders?.length > 0 ? (
        orders?.map((order, idx) => (
          <OrderCard
            key={idx}
            productId= {order.product_id}
            productName={order.product_name}
            productImgUrl={order.product_img_url}
            productQuantity={order.quantity}
            orderStatus={order.order_status}
            productSize={order.size}
            productTotalAmount={order.total_amount}
            paymentMethod={order.payment_method}
            orderDate={order.created_at}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-xl text-gray-500">No orders found.</p>
        </div>
      )}
    </section>
  );
};

export default Orders;
