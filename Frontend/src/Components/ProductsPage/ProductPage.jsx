import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import sizes from "../AdminDashboard/DashboardComponents/Sizes";
import { FaRupeeSign } from "react-icons/fa";
import { EasyZoomOnHover } from "easy-magnify";
import { EasyZoomOnMove } from "easy-magnify";
import RelatedProducts from "./RelatedProducts";
import { CartContext } from "../../Contexts/CartContext.jsx";

const ProductPage = () => {
  const { addToCart } = useContext(CartContext);

  const [quantity,setQuantity] = useState(1)
  const [size, setSize] = useState();


  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchDefaultProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/view/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const data = response.data.product;
          setProduct(data);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
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

  return (
    <div>
      <div className="flex md:flex-row flex-col  gap-8 border border-x-0 border-b-0 border-gray-400 py-8">
        <div className="flex md:flex-row flex-col gap-2 overflow-x-auto md:overflow-visible">
          <div className="flex md:flex-col flex-row gap-4 ">
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

          <div className="max-w-[600px] ">
            {product?.product_img_urls?.length > 0 && isImageLoaded && (
              <EasyZoomOnHover
                mainImage={{
                  alt: "product Image",
                  src: `https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_600,h_600,q_100,b_rgb:ffffff/v1743870766/${product.product_img_urls[currentImage]}`,
                }}
                zoomImage={{
                  alt: "zoomed Image",
                  src: `https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_1200,h_1200,q_100/v1743870766/${product.product_img_urls[currentImage]}`,
                }}
                delayTimer={200}
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
              <Ratings />
            </div>
            <div className="flex items-center">
              <FaRupeeSign className="md:text-2xl text-lg text-gray-800" />
              <h1 className="md:text-3xl text-lg font-semibold">
                {product.product_price}
              </h1>
            </div>
            <div>
              <label htmlFor="Quantity">Quantity</label>
              <input type="number" id="Quantity" className="p-2 outline-none border border-gray-500 rounded-lg w-18" min={1} />
            </div>
            <div>
              <p className="text-gray-600 font-semibold ">
                {product.product_description}
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-4 max-w-1/3 ">
                <label htmlFor="size">Select Size</label>
                <div className="flex flex-wrap justify-between w-full ">
                  {sizes.map((sizeOption, index) => (
                    <input
                      key={index}
                      type="checkbox"
                      className="btn w-fit rounded-md bg-gray-500 border-none text-white checked:bg-pink-400 focus:ring focus:ring-pink-400"
                      value={sizeOption}
                      aria-label={sizeOption}
                      onClick={(e) =>
                        setSize((prev) =>
                          prev.includes(e.target.value)
                            ? prev
                            : [...prev, e.target.value]
                        )
                      }
                    />
                  ))}
                </div>
                <div>
                  <button className="bg-[#ffa41c] hover:bg-[#ff8400] rounded-lg font-semibold px-8 py-3 cursor-pointer">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex  ">
          <div className="border border-gray-300 border-b-0 font-semibold w-32 p-2">
            <h1 className="text-xl">Description</h1>
          </div>
          <div className="border  border-gray-300 border-b-0 border-l-0 p-2 w-32">
            <h1 className="text-xl text-center">Reviews</h1>
          </div>
        </div>
        <div className="border border-gray-300 ">
          <p className="text-sm p-4 ">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer. E-commerce websites
            typically display products or services along with detailed
            descriptions, images, prices, and any available variations (e.g.,
            sizes, colors). Each product usually has its own dedicated page with
            relevant information.
          </p>
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
      <div>{product.product_category && product.type && product.product_id ? 
        <RelatedProducts
          category={product.product_category}
          type={product.type}
          productId = {product.product_id}
        />  : <span className="text-2xl  text-gray-700">No </span>}
      </div>
    </div>
  );
};

export default ProductPage;
