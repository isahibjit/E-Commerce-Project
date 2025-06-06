import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import sizes from "../../Admin/AdminDashboard/DashboardComponents/Sizes.js";
import { FaAngleDown, FaRupeeSign } from "react-icons/fa";
import RelatedProducts from "./RelatedProducts";
import { CartContext } from "../../Contexts/CartContext.jsx";
import Review from "./Components/Review.jsx";
import ProductsPageCardSkeleton from "./Components/ProductsPageCardSkeleton.jsx";
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
const ProductPage = () => {
  const BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [showReviews, setShowReviews] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState();

  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDefaultProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BACKEND_API}api/product/view/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const data = response.data.product;
          setProduct(data);
          setIsLoading(false);
          console.log(data)
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
        console.error(error);
      }
    };
    fetchDefaultProduct();
  }, [id]);

  useEffect(() => {
    if (product?.product_img_urls?.length > 0) {
      // Reset loading state whenever the current image changes
      setIsImageLoaded(true);
    }
  }, [product, currentImage]);
console.log("This is array",product.size)
  return (
    <div>
      {isLoading ? (
        <ProductsPageCardSkeleton />
      ) : (
        <div className="flex xl:flex-row flex-col  gap-8 border border-x-0 border-b-0 border-gray-400 py-8">
          <div className="flex xl:flex-row flex-col-reverse gap-2 overflow-x-auto md:overflow-visible">
            <div className="flex xl:flex-col flex-row gap-4 ">
              {product.product_img_urls?.map((img, index) => (
                <div
                  key={index}
                  onMouseOver={() => setCurrentImage(index)}
                  className="cursor-pointer w-24 h-24 rounded-lg shadow-lg"
                >
                  <img
                    src={`https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_400/v1743870766/${img}`}
                    alt={`Product ${index}`}
                    className={`rounded-lg shadow-lg w-full h-full object-cover ${
                      currentImage === index
                        ? "border-2 border-pink-600"
                        : "border-transparent"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="w-[600px] z-20 ">
              {product?.product_img_urls?.length > 0 && isImageLoaded && (
                <InnerImageZoom
                src={`https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_600,h_600,q_100,b_rgb:ffffff/v1743870766/${product.product_img_urls[currentImage]}`}
                zoomSrc={`https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_1200,h_1200,q_100/v1743870766/${product.product_img_urls[currentImage]}`}
                zoomType="hover" // Or "click" if you want both desktop and mobile
                zoomPreload={true}
              />
              
              )}
              {product?.product_img_urls?.length > 0 && !isImageLoaded && (
                <div className="flex items-center justify-center h-96 w-full border border-gray-300 rounded">
                  <p>Loading image...</p>
                </div>
              )}
            </div>
          </div>

          <div className="py-8 flex lg:flex-row w-full   flex-col gap-8  justify-center ">
            <div className="flex  flex-col gap-5 w-full  ">
              <div className="text-3xl font-semibold ">
                <h1>{product.product_name}</h1>
              </div>
              <div>
                <Ratings avgRating={product.avg_rating} />
              </div>
              <div className="flex items-center">
                <FaRupeeSign className="md:text-2xl text-lg text-gray-800" />

                <h1 className="md:text-3xl text-lg font-semibold">
                  {product.product_price}
                </h1>
              </div>
              <div className="flex flex-col gap-3">
                {product.stock_quantity > 0 ? (
                  <div>
                    <label htmlFor="quantity">Quantity : {quantity}</label>
                    <div className="relative z-10 w-25">
                      <select
                        onClick={(e) => setQuantity(e.target.value)}
                        id="Quantity"
                        className="block w-24 appearance-none rounded border border-gray-400 bg-white px-3 py-2 pr-8 text-sm leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
                      >
                        {Array.from(
                          { length: product.stock_quantity },
                          (_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          )
                        )}
                      </select>

                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        <FaAngleDown className="z-20" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xl text-gray-700 ">OUT OF STOCK</div>
                )}
              </div>
              <div>
                <p className="text-gray-600 font-semibold ">
                  {product.product_description}
                </p>
              </div>
              <div>
                <div className="flex flex-col gap-4 md:w-2/3 w-full  ">
                  <label htmlFor="size">Select Size</label>
                  <div className=" grid grid-cols-4 items-center ">
                    {sizes.map((sizeOption, index) => (
                      <input
                        key={index}
                        type="checkbox"
                        htmlFor="size"
                        className="btn w-fit rounded-md bg-gray-500 border-none text-white checked:bg-pink-400 focus:ring focus:ring-pink-400"
                        value={sizeOption}
                        aria-label={sizeOption}
                        checked={size === sizeOption}
                        onChange={() => setSize(sizeOption)}
                      />
                    ))}
                  </div>
                  <div>
                    {product.stock_quantity > 0 ? (
                      <button
                        onClick={() => {
                          if (size) {
                            addToCart(product, size, quantity);

                            navigate("/cart");
                          } else {
                            toast.info("Select the Size please");
                          }
                        }}
                        className="bg-[#ffa41c] hover:bg-[#ff8400] rounded-lg font-semibold px-8 py-3 cursor-pointer"
                      >
                        ADD TO CART
                      </button>
                    ) : (
                      <button className="  bg-[#fd6a60] hover:bg-[#ec4747e7] rounded-lg font-semibold px-8 py-3 cursor-not-allowed">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex  ">
          <div className="flex cursor-pointer">
            <div
              onClick={() => setShowReviews(false)}
              className={`border border-gray-300 border-b-0 font-semibold w-32 p-2 text-xl text-center ${
                !showReviews
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Description
            </div>
            <div
              onClick={() => setShowReviews(true)}
              className={`border border-gray-300 border-b-0 border-l-0 font-semibold w-32 p-2 text-xl text-center ${
                showReviews
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Reviews
            </div>
          </div>
        </div>
        <div className="border border-gray-300 p-4 transition-all duration-300 ease-in-out">
          {showReviews ? (
            <Review productId={product.product_id} />
          ) : (
            <p className="text-sm text-gray-700">
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet...
            </p>
          )}
        </div>
      </div>
      <div>
        <div className="text-3xl flex items-center justify-center font-semibold  mt-16 mb-8">
          <h1 className="text-gray-500">
            RELATED <span className="text-black">PRODUCT</span>
          </h1>
          <span className="w-13 h-[2px] bg-black"></span>
        </div>
      </div>
      <div>
        {product.product_category && product.type && product.product_id ? (
          <RelatedProducts
            category={product.product_category}
            type={product.type}
            productId={product.product_id}
          />
        ) : (
          <span className="text-2xl  text-gray-700">No </span>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
