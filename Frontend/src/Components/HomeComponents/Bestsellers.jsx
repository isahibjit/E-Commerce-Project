import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const Bestsellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/?bestseller= true",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setProducts(response.data.products);
        } else {
          toast.error("Probably Empty");
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <div className="grid  justify-center  2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 ">
      {products.map((product, index) => (
        <div 
        key={index}
        className="card bg-base-100 w-72 shadow-sm md:my-12 my-4">
          <figure>
            <img
              src={`https://res.cloudinary.com/sunnysingh78376/image/upload/v1743870766/${product.product_img_url}`}
              alt="Shoes"
              className="hover:scale-120 transition-all duration-200 cursor-pointer"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {product.product_name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="line-clamp-2">{product.product_description}</p>
            <div className="flex justify-between">
              <div className="card-actions">
                <div className="flex items-center">
                  <FaRupeeSign className="text-xl text-gray-800" />
                  <span className="text-2xl font-serif font-semibold">
                    {product.product_price}
                  </span>
                </div>
              </div>
              <div className="card-actions ">
              <NavLink
                  to={`/product/${product.product_id}/${product.product_name}`}
                >
                  <button className="w-fit font-semibold px-4 bg-[#ffa41c] hover:bg-[#ff8400] transition-all duration-200 cursor-pointer  py-2 rounded-lg ">
                        BUY NOW
                      </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bestsellers;
