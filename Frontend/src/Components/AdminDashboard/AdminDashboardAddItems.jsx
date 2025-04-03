import React ,{useEffect}from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import sizes from "./DashboardComponents/Sizes";
import FileInputHandler from "./DashboardComponents/FileInputHandler";
import { toast } from "react-toastify";
const AdminDashboardAddItems = () => {
  const checkBoxRef= useRef(null)
  const {register,handleSubmit,formState :{errors}} = useForm()
  const onSubmit = (data)=>{
    console.log(data)
  }
  useEffect(() => {
    if(errors.productName){
      toast.error(errors.productName.message)
    }
    if(errors.productDescription){
      toast.error(errors.productDescription.message)
    }
    if(errors.productPrice){
      toast.error(errors.productPrice.message)
    }
    if(errors.type){
      toast.error(errors.type.message)
    }
    if(errors.size){
      toast.error(errors.size.message)
    }
    
  }, [errors])
  
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
    <div className="px-2 shadow-lg   flex flex-col gap-4 card  p-4">
      <label htmlFor="Upload Image">Upload Image</label>
     <FileInputHandler />
      <div className="flex justify-center flex-col gap-2">
        <label htmlFor="Product Name">Product Name</label>
        <input
        {...register("productName",{required : "Name cannot be empty"})}
          type="text"
          className="border border-gray-300 outline-pink-400 px-3 py-2 text-lg text-gray-800 rounded-lg"
          placeholder="Type Here"
        />
      </div>
      <div className="flex justify-center  flex-col gap-2">
        <label htmlFor="Product Description">Product Description</label>
        <textarea
        {...register("productDescription",{required : "Description cannot be empty"})}
          type="text"
          className="border border-gray-300 outline-pink-400  px-3 py-2 text-lg text-gray-800 rounded-lg"
          placeholder="Write the content here"
        />
      </div>
      <div className="flex   flex-col sm:flex-row md:gap-8 gap-2  md:w-[90%] flex-wrap    ">
        <div className="flex flex-col gap-2  md:w-fit ">
          <label htmlFor="Product Category">Product Category</label>
          <select 
          {...register("productCategory",{required : "Product Category cannot be empty"})}
          className=" bg-white border-gray-300 outline-pink-400  px-4 py-2 border rounded-sm ">
            <option value="MEN">Men</option>
            <option value="WOMEN">Women</option>
            <option value="KIDS">Kids</option>
          </select>
        </div>
        <div className="flex gap-2 flex-col md:w-fit">
          <label htmlFor="Sub Category">Sub Category</label>
          <select
          {...register("type",{required : "Sub Category cannot be empty"})}
          className=" bg-white border-gray-300  outline-pink-400 px-4 py-2 border rounded-sm ">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 justify-center md:w-1/4 ">
          <label htmlFor="Product Price">Product Price</label>
          <input
           {...register("productPrice",{required : "Product Price cannot be empty"})}
            type="number"
            className="bg-white border border-gray-300  py-2 px-1 rounded-sm outline-pink-400"
            placeholder="25"
            min={0}
          />
        </div>
      </div>
      <div className="md:w-[60%] flex flex-col gap-4">
        <label htmlFor="Product Sizes">Product Sizes</label>
        <div className="flex flex-wrap justify-between ">
          {sizes.map((size,index)=>{
            return <input
            {...register("size",{required : "Product Size cannot be empty"})}
            key={index}
            type="checkbox"
            className="btn w-fit  rounded-md bg-gray-500  border-none   text-white checked:bg-pink-400 focus:ring focus:ring-pink-400"
            value={size}
            aria-label={size}
          />
          })}
        </div>
        <div className="flex flex-col gap-2 justify-center md:w-1/2 ">
          <label htmlFor="ProductQuantity">Quantity</label>
          <input
          {...register("stockQuantity")}
          className="bg-white border border-gray-300  py-2 px-1 rounded-sm outline-pink-400" type="number"
          placeholder="0"
          min={1}
          />
          
        </div>
        <div  className="flex gap-2 cursor-pointer ">
          <input
          {...register("bestSeller")}
          type="checkbox" id="bestSeller" />
          <label htmlFor="bestSeller"className="cursor-pointer">Add to bestseller</label>
        </div>
        <div className="">
          <button type="submit" className="cursor-pointer btn btn-black w-1/3 rounded-lg bg-black text-white border-black">ADD</button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default AdminDashboardAddItems;
