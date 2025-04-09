import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import axios from "axios";

const RelatedProducts = ({ category, type , productId}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasError, setHasError] = useState(0)
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const url = new URL("http://localhost:3000/api/product/filter");
        url.searchParams.append("category[]", category);
        url.searchParams.append("type[]", type);
        url.searchParams.append("_page", page);
        url.searchParams.append("productId",productId)
        url.searchParams.append("sort", "default");
        const response = await axios.get(url.toString(), {
          withCredentials: true,
        });
        if (response.status === 200) {
          const newData = response.data.products;
          setRelatedProducts(newData);
        }
      } catch (error) {
        console.log(error);
        if(error.response.status === 404) {
            setHasError(true)
        }
      }
    };
    fetchFilteredProducts();
  }, []);
  console.log("related data", relatedProducts);
  return (
    <>
      {" "}{!hasError ? <div className="grid justify-center  2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 ">
      {relatedProducts.map((product) => (
          <ProductCard product={product} />
        ))}
        </div>  : <h1 className="text-3xl text-center font-semibold text-gray-800 p-2 bg-yellow-200 rounded-lg shadow-lg ">Related Products are not on stock for this category</h1>}
      
    </>
  );
};

export default RelatedProducts;
