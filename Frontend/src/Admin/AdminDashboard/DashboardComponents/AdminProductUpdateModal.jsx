import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import sizes from "./Sizes";
import { toast } from "react-toastify";

const AdminProductUpdateModal = ({
  isEditModalOpen,
  onCancel,
  onConfirm,
  product,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);
        const response = await axios.put(
          `http://localhost:3000/api/product/update/${product.product_id}`,
          data,
          { withCredentials: true }
        );
        setIsLoading(true);
        if (response.status === 200) {
          toast.success("Product Updated Successfully")
          reset()
        }
        onConfirm()
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditModalOpen) {
      // Lock background scroll and force scroll to top
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      window.scrollTo({ top: 0, behavior: "instant" }); // instantly scroll to top
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isEditModalOpen]);
  if (!isEditModalOpen) return null;
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0  bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-[60%] w-[80%]"
      >
        <div className="px-2 py-4 shadow-lg    flex flex-col gap-4 card  bg-pink-100 ">
          <div className="text-center md:text-3xl text-xl font-semibold  text-gray-700">
            <h1 className="">Update Products</h1>
          </div>
          <div className="flex justify-center flex-col gap-2">
            <label htmlFor="Product Name">Product Name</label>
            <input
              {...register("productName", { required: "Name cannot be empty" })}
              type="text"
              className="border border-gray-300 outline-pink-400 px-3 py-2 text-lg text-gray-800 rounded-lg"
              placeholder="Type Here"
              defaultValue={product.product_name}
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
              defaultValue={product.product_description}
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
                defaultValue={product.product_category}
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
                defaultValue={product.type}
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
                defaultValue={product.product_price}
              />
            </div>
          </div>
          <div className="md:w-[30%] flex flex-col gap-4">
            <label htmlFor="Product Sizes">Product Sizes</label>
            <div className="flex flex-wrap justify-between">
              {sizes.map((size, index) => {
                const isChecked = product.size.includes(size)
                return (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      {...register("size", {
                        required: "Product Size cannot be empty",
                      })}
                      type="checkbox"
                      className="btn w-fit rounded-md bg-gray-500 border-none text-white checked:bg-pink-400 focus:ring focus:ring-pink-400"
                      value={size}
                      aria-label={size}
                      defaultChecked={isChecked}
                    />
                    <span>{size}</span>
                  </label>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 justify-center md:w-1/2 ">
              <label htmlFor="ProductQuantity">
                Quantity <span className="text-red-800">*</span>
              </label>
              <input
                {...register("stockQuantity", {
                  required: "Stock Quantity Cannot be Empty",
                })}
                className="bg-white border border-gray-300  py-2 px-1 rounded-sm outline-pink-400"
                type="number"
                placeholder="0"
                min={1}
                defaultValue={product.stock_quantity}
              />
            </div>
            <div className="flex gap-2 cursor-pointer ">
              <input
                {...register("bestSeller")}
                type="checkbox"
                id="bestSeller"
                defaultChecked={product.best_seller}
                aria-label="Toggle bestseller status"
              />
              <label htmlFor="bestSeller" className="cursor-pointer">
                Add to bestseller
              </label>
            </div>
          </div>
          <div className="flex  justify-between">
            <button
              type="submit"
              className="cursor-pointer btn btn-black w-1/3 rounded-lg bg-black text-white border-black"
            >
              Update
            </button>
            <button
              onClick={onCancel}
              className="cursor-pointer btn bg-blue-400 w-1/3 rounded-lg bg-info text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductUpdateModal;
