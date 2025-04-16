import express from "express"
import { addOrders,getOrders, getOrdersByUserId, updateOrder } from "../Controller/orderController.js"
import { ensureAdminAuthenticated, ensureUserAuthenticated } from "../Middlewares/ensureAuthenticated.js"
const router = express.Router()
//makesure to add the userAuthenticated middleware after doing it
router.post("/",ensureUserAuthenticated,addOrders)
router.get("/getOrders",ensureUserAuthenticated,getOrders)
router.get("/getOrdersByUserId",ensureAdminAuthenticated,getOrdersByUserId)
router.put("/updateOrder/:id",ensureAdminAuthenticated,updateOrder)
export default router