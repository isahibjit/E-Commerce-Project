import React, { useEffect, useState } from "react";
import OrderCard from "./Components/OrderCard";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import stopImg from "../../../assets/stop.png"; // assuming you have a fallback image
import OrderCardSkeleton from "./Components/OrderCardSkeleton";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const fetchOrders = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `${BACKEND_API}api/orders/getOrdersByUserId?page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      orders: [],
      hasMore: false,
    };
  }
};

const AdminOrders = () => {
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["adminOrders"],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allOrders = data?.pages.flatMap((page) => page.orders) || [];
  console.log(allOrders);
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold mb-4">Order Page</h2>

      {isLoading ? (
        <div>
          <OrderCardSkeleton />
        </div>
      ) : allOrders.length > 0 ? (
        allOrders.map((order, index) => <OrderCard key={index} order={order} />)
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={stopImg} alt="No Orders" className="w-24 h-24 mb-4" />
          <p className="text-gray-500">No orders found</p>
        </div>
      )}

      <div ref={ref} className="flex items-center justify-center mt-4">
        {isFetchingNextPage && (
          <l-bouncy size="50" speed="1.14" color="black"></l-bouncy>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
