import Stripe from "stripe";
import bodyParser from "body-parser";
import { processPaidCheckoutSession } from "../Services/stripeOrderService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function registerStripeWebhook(app) {
  app.post(
    "/api/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === "checkout.session.completed") {
        try {
          await processPaidCheckoutSession(event.data.object.id, stripe);
        } catch (processingError) {
          console.error("Stripe webhook processing failed:", processingError);
          return res.status(500).send("Webhook processing failed");
        }
      }

      return res.status(200).send("Webhook received");
    }
  );
}
