import React, { useEffect, useMemo, useState } from "react";
import uploadImgIcon from "../../../assets/uploadImg.png";
import { useForm } from "react-hook-form";
import sizes from "../DashboardComponents/Sizes";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../DashboardComponents/Loading";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const MAX_IMAGES = 4;

const AdminDashboardAddItems = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const imagePreviews = useMemo(
    () => images.map((file) => ({ fileName: file.name, previewUrl: URL.createObjectURL(file) })),
    [images]
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, [imagePreviews]);

  const handleImageSelection = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    if (selectedFiles.length > MAX_IMAGES) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
      event.target.value = "";
      return;
    }

    setImages(selectedFiles);
  };

  const clearImages = () => {
    setImages([]);
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error("At least one image should be added.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_API}api/product/add`, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        const productId = response.data.productId;
        const formData = new FormData();

        images.forEach((image) => {
          formData.append("images", image);
        });
        formData.append("productId", productId);

        const uploadResponse = await axios.post(
          `${BACKEND_API}api/product/upload-images`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        if (uploadResponse.status === 201) {
          toast.success("Product added successfully");
          clearImages();
          reset();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add product.");
    } finally {
      setIsLoading(false);
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
    if (errors.stockQuantity) {
      toast.error(errors.stockQuantity.message);
    }
  }, [errors]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:w-[60%] min-h-[65vh]">
      <div className="px-2 py-4 shadow-lg flex flex-col gap-4 card">
        <div className="flex flex-col gap-2">
          <label htmlFor="product-images">Upload Images</label>
          <p className="text-sm text-gray-500">Select up to 4 product images in one go.</p>
          <input
            id="product-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelection}
            className="hidden"
          />
          <label
            htmlFor="product-images"
            className="cursor-pointer border border-dashed border-gray-300 rounded-lg px-4 py-4 flex items-center justify-center gap-3 bg-white hover:border-gray-400 transition-colors"
          >
            <img src={uploadImgIcon} alt="Upload" className="w-12 h-12 object-contain" />
            <span className="text-gray-700 font-medium">
              {images.length > 0 ? `${images.length} image(s) selected` : "Choose images"}
            </span>
          </label>
          {images.length > 0 ? (
            <button
              type="button"
              onClick={clearImages}
              className="self-start text-sm text-gray-600 underline cursor-pointer"
            >
              Clear selected images
            </button>
          ) : null}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: MAX_IMAGES }).map((_, index) => {
              const preview = imagePreviews[index];

              return (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 aspect-square flex items-center justify-center"
                >
                  <img
                    src={preview?.previewUrl || uploadImgIcon}
                    alt={preview?.fileName || "Upload preview"}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
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
        <div className="flex flex-col sm:flex-row md:gap-8 gap-2 md:w-[90%] flex-wrap">
          <div className="flex flex-col gap-2 md:w-fit ">
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
            />
          </div>
          <div className="flex gap-2 cursor-pointer ">
            <input {...register("bestSeller")} type="checkbox" id="bestSeller" />
            <label htmlFor="bestSeller" className="cursor-pointer">
              Add to bestseller
            </label>
          </div>
          <div>
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
  );
};

export default AdminDashboardAddItems;
