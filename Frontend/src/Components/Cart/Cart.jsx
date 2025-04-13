import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../../Contexts/CartContext";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
const Cart = () => {
  const { cartItems,removeFromCart,getTotalPrice,getSubTotalPrice,updateCart,getTotalShippingFees } = useContext(CartContext);

  return (
    <div>
      <div className="border-[1px]  border-gray-400 border-x-0 border-b-0">
        {/* Header */}
        <div className="text-2xl gap-2 flex items-center font-semibold my-8">
          <h1 className="text-gray-500">
            YOUR <span className="text-gray-900">CART</span>
          </h1>
          <span className="w-13 h-[2px] bg-black"></span>
        </div>

        {/* Conditional Rendering */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div 
              key={index}
              className="flex gap-5 justify-between items-center  bg-white px-2 py-5 border border-x-0 border-gray-300"
            > 
              {/* Product Details */}
              <div className="flex gap-2 w-1/3">
                <img
                  className="rounded-lg shadow-lg"
                  src={`https://res.cloudinary.com/sunnysingh78376/image/upload/w_100,h_100,c_thumb/${item.product_img_urls[0]}`}
                  alt={item.product_name}
                />
                <div className="flex flex-col justify-center gap-2">
                  <h1 className="text-xl text-gray-700 font-semibold">
                    {item.product_name}
                  </h1>
                  <div className="flex gap-4">
                    <h1 className="text-lg flex items-center"><FaRupeeSign />{item.product_price}</h1>
                    <span className="bg-gray-200 border-[1px] border-gray-300 py-1 px-3 font-semibold">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-1/3">
           
              <label className="text-gray-600 font-semibold" htmlFor="quantity">Quantity : </label>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateCart(item.product_id,item.size,e.target.value)
                  }
                  id="Quantity"
                  className="block w-24 appearance-none rounded border border-gray-400 bg-white px-3 py-2 pr-8 text-sm leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  {Array.from({ length: item.stock_quantity }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              
              </div>

              {/* Delete Icon */}
              <div onClick={()=>{
                removeFromCart(item.product_id,item.size)
                {toast.success("Product Removed From Cart !")}
              }} className="text-4xl cursor-pointer hover:bg-red-400 rounded-lg transition-all duration-200">
                <MdDelete />
              </div>
            </div>
          ))
        )}
      </div>
      <div>
      <div className="flex flex-col items-end">
          <div className="md:w-[35%]  w-full p-3">
            
         <div className="text-2xl gap-4 flex items-center  font-semibold py-5">
         <h1 className="text-gray-500 ">
            CART <span className="text-gray-900">TOTALS</span>
          </h1>
          <span className="w-13 h-[2px] bg-black"></span>
         </div>
          <div className="flex items-center justify-between  p-2 ">
            <h1>Subtotal</h1>
            <div className="flex items-center ">
              <FaRupeeSign />
              <span>{getSubTotalPrice()}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border border-gray-300 border-x-0 p-2">
            <h1>Shipping Fee</h1>
            <div className="flex items-center">
              <FaRupeeSign />
              <span>{cartItems.length > 0 ? getTotalShippingFees() : 0}</span>
            </div>
          </div>
          <div className="flex items-center font-semibold justify-between p-2  ">
            <h1>Total</h1>
            <div className="flex items-center">
              <FaRupeeSign />
              <span>{getTotalPrice()}</span>
            </div>
          </div>
        
        </div>
        <button className="bg-black text-white py-2 px-4 cursor-pointer hover:bg-gray-950  transition-colors duration-200 md:w-32 w-full">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
