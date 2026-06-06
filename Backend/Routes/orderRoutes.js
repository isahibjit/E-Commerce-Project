import express from "express";
import {
  addOrders,
  downloadOrderInvoice,
  getOrders,
  getOrdersByUserId,
  updateOrder,
} from "../Controller/orderController.js";
import {
  ensureAdminAuthenticated,
  ensureAuthenticated,
  ensureUserAuthenticated,
} from "../Middlewares/ensureAuthenticated.js";

const router = express.Router();

router.post("/", ensureUserAuthenticated, addOrders);
router.get("/getOrders", ensureUserAuthenticated, getOrders);
router.get("/getOrdersByUserId", ensureAdminAuthenticated, getOrdersByUserId);
router.get("/:id/invoice", ensureAuthenticated, downloadOrderInvoice);
router.put("/updateOrder/:id", ensureAdminAuthenticated, updateOrder);

export default router;
