import React, { useEffect, useState } from "react";
import uploadImgIcon from "../../../assets/uploadImg.png";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import sizes from "../DashboardComponents/Sizes";

import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../DashboardComponents/Loading";
const AdminDashboardAddItems = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [isLoading, setIsLoading] = useState(false)

  const fileInputs = useRef([]);
  const onSubmit = async (data) => {
    try {
      if(!images.some(image=> image !== null)){
        toast.error("At least one image should be added!")
        return 
      }
      const response  = await axios.post("http://localhost:3000/api/product/add",data,{withCredentials: true})
      
      setIsLoading(true)
      if (response.status === 201) {
              
              const productId = response.data.productId
              const formData = new FormData();
              images.map((image)=>{
                formData.append("images", image);
              })
              formData.append("productId",productId)
              try {
              const response =  await axios.post("http://localhost:3000/api/product/upload-images", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                  withCredentials: true,
                });
                if(response.status === 201){
                  setIsLoading(false)
                  toast.success("Product Added Successfully");
                  reset()
                  setImagePreviews([null, null, null, null])
                }
              } catch (error) {
                console.log(error)
                setIsLoading(false)
              }
             
         }    
            
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    if (errors.productName) {
      toast.error(errors.productName.message);
    }
    if (errors.productDescription) {
      toast.error(errors.productDescription.message);
    }
    if (errors.productPrice) {
      toast.error(errors.productPrice.message);
    }
    if (errors.type) {
      toast.error(errors.type.message);
    }
    if (errors.size) {
      toast.error(errors.size.message);
    }
    if(errors.stockQuantity){
      toast.error(errors.stockQuantity.message)
    }
    if(errors.fileInput){
      toast.error(errors.fileInput.message)
    }
  }, [errors]);

  if(!isLoading){
    return  (
      <form action="" onSubmit={handleSubmit(onSubmit)} className="md:w-[60%]">
        <div className="px-2 py-4 shadow-lg    flex flex-col gap-4 card   ">
          <label htmlFor="fileInput">Upload Image</label>
          <div className="flex gap-3  ">
            {imagePreviews.map((image, index) => (
              <div key={index}>
                <input
                  id={`fileInput-${index}`}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const newFiles = [...images];
                      newFiles[index] = file;
                      setImages(newFiles);
  
                      const newImages = [...imagePreviews];
                      newImages[index] = URL.createObjectURL(file);
                      setImagePreviews(newImages);
                    }
                  }}
                  ref={(el) => (fileInputs.current[index] = el)}
                  type="file"
                  className="hidden"
                />
                <img
                  src={image || uploadImgIcon}
                  alt="uploadImgIcon"
                  className="admin-upload-img object-cover"
                  onClick={() => {
                    fileInputs.current[index].click();
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-col gap-2">
            <label htmlFor="Product Name">Product Name</label>
            <input
              {...register("productName", { required: "Name cannot be empty" })}
              type="text"
              className="border border-gray-300 outline-pink-400 px-3 py-2 text-lg text-gray-800 rounded-lg"
              placeholder="Type Here"
            />
          </div>
          <div className="flex justify-center  flex-col gap-2">
            <label htmlFor="Product Description">Product Description</label>
            <textarea
              {...register("productDescription", {
                required: "Description cannot be empty",
              })}
              type="text"
              className="border border-gray-300 outline-pink-400  px-3 py-2 text-lg text-gray-800 rounded-lg"
              placeholder="Write the content here"
            />
          </div>
          <div className="flex   flex-col sm:flex-row md:gap-8 gap-2  md:w-[90%] flex-wrap    ">
            <div className="flex flex-col gap-2  md:w-fit ">
              <label htmlFor="Product Category">Product Category</label>
              <select
                {...register("productCategory", {
                  required: "Product Category cannot be empty",
                })}
                className=" bg-white border-gray-300 outline-pink-400  px-4 py-2 border rounded-sm "
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex gap-2 flex-col md:w-fit">
              <label htmlFor="Sub Category">Sub Category</label>
              <select
                {...register("type", {
                  required: "Sub Category cannot be empty",
                })}
                className=" bg-white border-gray-300  outline-pink-400 px-4 py-2 border rounded-sm "
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 justify-center md:w-1/4 ">
              <label htmlFor="Product Price">Product Price</label>
              <input
                {...register("productPrice", {
                  required: "Product Price cannot be empty",
                })}
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
              {sizes.map((size, index) => {
                return (
                  <input
                    {...register("size", {
                      required: "Product Size cannot be empty",
                    })}
                    key={index}
                    type="checkbox"
                    className="btn w-fit  rounded-md bg-gray-500  border-none   text-white checked:bg-pink-400 focus:ring focus:ring-pink-400"
                    value={size}
                    aria-label={size}
                  />
                );
              })}
            </div>
            <div className="flex flex-col gap-2 justify-center md:w-1/2 ">
              <label htmlFor="ProductQuantity">Quantity <span className="text-red-800">*</span></label>
              <input
                {...register("stockQuantity",{required : "Stock Quantity Cannot be Empty"})}
                className="bg-white border border-gray-300  py-2 px-1 rounded-sm outline-pink-400"
                type="number"
                placeholder="0"
                min={1}
              />
            </div>
            <div className="flex gap-2 cursor-pointer ">
              <input
                {...register("bestSeller")}
                type="checkbox"
                id="bestSeller"
              />
              <label htmlFor="bestSeller" className="cursor-pointer">
                Add to bestseller
              </label>
            </div>
            <div className="">
              <button
                type="submit"
                className="cursor-pointer btn btn-black w-1/3 rounded-lg bg-black text-white border-black"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      
      </form>
    ) ;
  }
  else{
    return <Loading />
  }
  
};

export default AdminDashboardAddItems;
