import dotenv from "dotenv";
import {
  createCheckoutSessionService,
  processPaidCheckoutSession,
} from "../Services/stripeOrderService.js";

dotenv.config();

export const createCheckoutSession = async (req, res) => {
  const { cart: productData, ...userData } = req.body;

  try {
    const session = await createCheckoutSessionService({
      cartItems: productData,
      userData,
      userId: req.user?.id,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const checkSession = async (req, res) => {
  const { session_id } = req.query;

  try {
    const sessionResult = await processPaidCheckoutSession(session_id);

    if (sessionResult.payment_status === "paid") {
      return res.status(200).json({
        message: "Payment confirmed and order saved",
        payment_status: "paid",
        customer_email: sessionResult.customer_email,
        total_amount: sessionResult.total_amount,
        userData: sessionResult.userData,
        sessionId: sessionResult.sessionId,
        orderId: sessionResult.orderId,
      });
    }

    return res.status(200).json({
      message: "Payment not completed",
      payment_status: sessionResult.payment_status,
    });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    return res.status(500).json({ error: "Failed to retrieve session" });
  }
};
