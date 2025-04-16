import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
     
  return (
    <div className="">
            
              <div className="card bg-base-100 w-64 h-[500px] shadow-sm md:my-12 my-4">
                <figure>
                  <a
                    href={`/product/${product.product_id}/${product.product_name}`}
                  >
                    <img
                      src={`https://res.cloudinary.com/sunnysingh78376/image/upload/v1743870766/${product.product_img_url}`}
                      alt="Shoes"
                      className="hover:scale-120 transition-all duration-200 cursor-pointer"
                    />
                  </a>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {product.product_name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p className="line-clamp-1 ">{product.product_description}</p>
                  <div className="flex justify-between">
                    <div className="card-actions items-center">
                      <div className="flex items-center">
                        <FaRupeeSign className="text-xl text-gray-800" />
                        <span className="text-lg font-serif font-semibold">
                          {product.product_price}
                        </span>
                      </div>
                    </div>
                    <div className="">
                    <a
                    href={`/product/${product.product_id}/${product.product_name}`}
                  >
                      <button className="w-fit px-4 bg-[#ffa41c] hover:bg-[#ff8400] transition-all duration-200 cursor-pointer  py-2 rounded-lg ">
                        Add to Cart
                      </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
  )
}

export default ProductCard