import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

import DeleteConfirmationModal from "../DashboardComponents/DeleteConfirmationModal";
import AdminProductUpdateModal from "../DashboardComponents/AdminProductUpdateModal";
import AdminListItemsSkeletons from "./Components/AdminListItemsSkeleton";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
const AdminListItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_API}api/product/admin/product-lists`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProducts(response.data.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };
  const deleteProduct = async (productId) => {
    console.log("Clicked Id ", productId);
    try {
      const response = await axios.delete(
        `${BACKEND_API}api/product/${productId}`,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmDelete = () => {
   
    deleteProduct(productToDelete.product_id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const confirmEdit = ()=>{
    editProduct(productToEdit.product_id)
    setIsEditModalOpen(false)
    setProductToEdit(null)
    fetchProducts()
  }
  const cancelEdit = async()=>{
    setIsEditModalOpen(false)
    setProductToEdit(null)
  }
  const editProduct = async()=>{
    console.log("Product is updating ")

  }
  const handleEditClick = async(product)=>{
    console.log("I got Clicked")
    setProductToEdit(product)
    setIsEditModalOpen(true)
  }
  return !isLoading ? (
    <div className="md:w-[70%]  w-full px-2 py-4">
      <div>
        <h1 className="text-gray-600">All Product List</h1>

        {/* Header */}
        <div className="flex items-center border bg-white my-2 shadow-md text-lg text-gray-700 px-2 font-semibold">
          <div className="w-[20%]">Image</div>
          <div className="w-[35%]">Name</div>
          <div className="w-[30%]">Category</div>
          <div className="w-[15%]">Price</div>
          <div className="w-[15%] hidden md:block">Action</div>
        </div>

        {products.map((product) => (
          <div
            key={product.product_id}
            className="flex items-center  border bg-white text-gray-700 border-gray-300 my-2 shadow-md px-2 py-1"
          >
            <DeleteConfirmationModal
              isDeleteModalOpen={isDeleteModalOpen}
              onCancel={cancelDelete}
              onConfirm={confirmDelete}
              productName={productToDelete?.product_name}
            />
            <AdminProductUpdateModal
            isEditModalOpen = {isEditModalOpen}
            onCancel = {cancelEdit}
            onConfirm = {confirmEdit}
            product={productToEdit}
            />
            <div className="w-[15%]  overflow-hidden rounded-md">
              <img
                src={`https://res.cloudinary.com/sunnysingh78376/image/upload/c_fit,q_auto,w_200,h_300/v1743761910/${product.product_img_url}`}
                alt="product"
                className="object-cover w-[100px] h-[100px]"
              />
            </div>
            <div className="w-[35%]">
              <h1 className="px-1">{product.product_name}</h1>
            </div>
            <div className="w-[20%]">
              <h1 className="px-1">{product.product_category}</h1>
            </div>

            <div className="w-[15%] ">
           
                <span className="px-1 flex items-center">
                  <FaRupeeSign />
                  {product.product_price}
                </span>
            </div>
            <div className="w-[15%] hidden md:flex gap-2">
              <button
                onClick={() => handleDeleteClick(product)}
                className="cursor-pointer"
              >
                <MdDeleteForever className="text-4xl hover:bg-red-400 rounded-lg p-1" />
              </button>
              <button
                onClick={() => handleEditClick(product)}
                className="cursor-pointer"
              >
                <MdEdit className="text-4xl hover:bg-blue-400 rounded-lg p-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      {Array.from({length : 10}).map((_, idx) =>(
        <AdminListItemsSkeletons />
      ))}
    </div>
  );
};

export default AdminListItems;
