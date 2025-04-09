import React, { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { CartContext } from '../../Contexts/CartContext';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);

  return (
    <div className='border-[1px] border-gray-400 border-x-0 border-b-0'>
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
            className='flex gap-5 justify-between items-center bg-white px-2 py-5 border border-x-0 border-gray-300'
          >
            {/* Product Details */}
            <div className='flex gap-2'>
              <img
                className='rounded-lg shadow-lg'
                src={`https://res.cloudinary.com/sunnysingh78376/image/upload/w_100,h_100,c_thumb/${item.product_img_urls[0]}`}

                alt={item.product_name}
              />
              <div className='flex flex-col justify-center gap-2'>
                <h1 className='text-xl text-gray-700 font-semibold'>
                  {item.product_name}
                </h1>
                <div className='flex gap-4'>
                  <h1 className='text-xl'>${item.product_price}</h1>
                  <span className='bg-gray-200 border-[1px] border-gray-300 py-1 px-3 font-semibold'>
                    {item.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Delete Icon */}
            <div className='text-4xl cursor-pointer'>
              <MdDelete />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;