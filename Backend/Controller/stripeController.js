import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
import dotenv from "dotenv"
dotenv.config()
export const createCheckoutSession = async (req, res) => {
    const { cart: productData, ...userData } = req.body


    const lineItems = productData.map(item => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.product_name,
                description: `Category: ${item.product_category}, Size: ${item.size}`,
                images: ["https://res.cloudinary.com/sunnysingh78376/image/upload/" + item.product_img_urls[0]]
            },
            unit_amount: Math.round(item.product_price * 100),
        },
        quantity: item.quantity,

    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}success?session_id={CHECKOUT_SESSION_ID}` || "https://e-commerce-project-frontend-3h97.onrender.com/success?session_id={CHECKOUT_SESSION_ID}`,",
            cancel_url: `${process.env.FRONTEND_URL}cancel` || "https://e-commerce-project-frontend-3h97.onrender.com/cancel",
            metadata : {
                userData  : JSON.stringify(userData)
            }
        })
        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}




export const checkSession = async (req, res) => {
    const { session_id } = req.query;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Check if payment is successful
        if (session.payment_status === "paid") {
            const userData = session.metadata.userData
            
            
            return res.status(200).json({
                message: "Payment confirmed and order saved",
                payment_status: "paid",
                customer_email: session.customer_details.email,
                total_amount : session.amount_total,
                userData : JSON.parse(userData),
                sessionId : session.id
            });
        }

        return res.status(200).json({
            message: "Payment not completed",
            payment_status: session.payment_status,
        });

    } catch (err) {
        console.error("❌ Stripe session error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve session" });
    }
};
