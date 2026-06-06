import express from "express";
import { checkSession, createCheckoutSession } from "../Controller/stripeController.js";
import { ensureUserAuthenticated } from "../Middlewares/ensureAuthenticated.js";

const router = express.Router();

router.post("/create-checkout-session", ensureUserAuthenticated, createCheckoutSession);
router.get("/check-payment", ensureUserAuthenticated, checkSession);

export default router;
