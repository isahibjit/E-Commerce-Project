import React from 'react'

const CreateAccountForm = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className='relative'>
            <h1 className='text-4xl p-4 text-gray-800 font-serif text-center '>Sign Up</h1>
            <span className='w-12 bg-black h-[2px] absolute bottom-8 left-36 '></span>
        </div>
        <form action="" className='flex flex-col gap-4 items-center '>
            <input type="text" className='border outline-none w-96  text-xl rounded-lg p-2' placeholder="Name" name="" id="" />
            <input type="text" className='border outline-none w-96  text-xl rounded-lg p-2' placeholder='Email' name="" id="" />
            <div className='flex flex-col justify-center gap-2'>
            <input type="text" className='border outline-none w-96  text-xl rounded-lg p-2' placeholder='Password' name="" id="" />
            <div className='flex justify-between'>
            <a href="" className='text-sm text-gray-900'>Forgot your password?</a>
            <a href="" className='text-sm text-gray-900'>Login Here</a>
            </div>
            </div>
            <button className='bg-black text-white py-2 cursor-pointer rounded-lg hover:bg-gray-950 transition-all duration-200  px-6 w-fit'>Sign Up</button>
        </form>
    </div>
  )
}

export default CreateAccountForm