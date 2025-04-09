import React from 'react'
import { MdDelete } from "react-icons/md";

const Cart = () => {
  return (
    <div className='border-[1px] border-gray-400 border-x-0 border-b-0'>
        <div className="text-2xl gap-2 flex items-center font-semibold  my-8">
          <h1 className="text-gray-500">YOUR <span className="text-gray-900">CART</span></h1>
          <span className="w-13 h-[2px] bg-black"></span>
        </div>
        <div className='flex gap-5 justify-between items-center bg-white px-2 py-5 border border-x-0 border-gray-300 '>
            <div className='flex gap-2'>
            <img className='rounded-lg shadow-lg' src="https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_100,h_100,q_100,b_rgb:ffffff/v1743870766/q2lzxw3unixxiia1oftl.jpg" alt="" />
            <div className='flex flex-col justify-center gap-2'>
                <h1 className='text-xl text-gray-700 font-semibold'>Kid Tapered Slim Fit Trouser</h1>
                <div className='flex gap-4'>
                    <h1 className='text-xl'>$38</h1>
                    <span className='bg-gray-200 border-[1px] border-gray-300 py-1 px-3 font-semibold'>XXL</span>
                </div>
            </div>
            </div>
           
            <div className='text-4xl cursor-pointer'>
                <MdDelete />
            </div>
        </div>
    </div>
  )
}

export default Cart