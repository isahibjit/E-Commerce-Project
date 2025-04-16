
import express from "express"
import { checkSession, createCheckoutSession } from "../Controller/stripeController.js"
import Stripe from "stripe"
import bodyParser from "body-parser"

const Router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


Router.post("/create-checkout-session",createCheckoutSession)
Router.get("/check-payment",checkSession)





export default Router