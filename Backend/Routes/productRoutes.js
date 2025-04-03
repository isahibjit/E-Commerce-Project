import express from "express";
import { ensureAdminAuthenticated } from "../Middlewares/ensureAuthenticated.js";
import { getProducts, updateProduct } from "../Controller/productController.js";
import { addProducts } from "../Controller/productController.js";
import { getProductById } from "../Controller/productController.js";
import { getProductByUserId } from "../Controller/productController.js";
import { deleteProduct } from "../Controller/productController.js";
import { validateProduct } from "../Middlewares/validateProduct.js";
const router = express.Router()
router.get("/",getProducts)
router.get("/:productId",getProductById)
// for admins to view how many products they have listed till now 
router.get("/by-user/:Userid",ensureAdminAuthenticated,getProductByUserId)
router.post("/add",ensureAdminAuthenticated,validateProduct,addProducts)
// router.put("/update/",ensureAdminAuthenticated,updateProduct)

// admins with their corresponding products can only be deleted

router.put("/update/:productId",ensureAdminAuthenticated,validateProduct,updateProduct)
router.delete("/:productId",ensureAdminAuthenticated,deleteProduct)
export default router