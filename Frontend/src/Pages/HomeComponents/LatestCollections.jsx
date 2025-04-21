import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../ProductsPage/ProductCard";
import { set } from "react-hook-form";
import ProductCardSkeleton from "../ProductsPage/Components/ProductCardSkeleton";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const LatestCollections = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_API}api/product`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setProducts(response.data.products);
          setIsLoading(false);
        } else {
          toast.error("Probably Empty");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
   <div className="grid justify-center gap-6 px-4 
                sm:grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                2xl:grid-cols-4">
  {isLoading ? (
    <>
      {Array.from({ length: 12 }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </>
  ) : (
    products?.map((product, idx) => (
      <ProductCard key={idx} id={idx} product={product} />
    ))
  )}
</div>

  );
};

export default LatestCollections;
