import express from "express";
import { ensureAdminAuthenticated } from "../Middlewares/ensureAuthenticated.js";
import { filterProduct, getProducts, updateProduct, uploadImage } from "../Controller/productController.js";
import { addProducts } from "../Controller/productController.js";
import { getProductById } from "../Controller/productController.js";
import { getProductByUserId } from "../Controller/productController.js";
import { deleteProduct } from "../Controller/productController.js";
import { validateProduct } from "../Middlewares/validateProduct.js";
import { upload } from "../Middlewares/multer.js";

const router = express.Router()
router.get("/",getProducts)
router.get("/view/:productId",getProductById)
// for admins to view how many products they have listed till now 
router.get("/admin/product-lists",ensureAdminAuthenticated,getProductByUserId)
router.post("/add",ensureAdminAuthenticated,validateProduct,addProducts)
// router.put("/update/",ensureAdminAuthenticated,updateProduct)
router.put("/update/:productId",ensureAdminAuthenticated,validateProduct,updateProduct)

// admins with their corresponding products can only be deleted
router.delete("/:productId",ensureAdminAuthenticated,deleteProduct)
router.get("/filter",(filterProduct))
// Uploading Images using multer to the local storage
router.post("/upload-images",upload.array("images",5),uploadImage) 

export default router