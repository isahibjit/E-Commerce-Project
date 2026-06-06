import Stripe from "stripe";
import { addOrdersService } from "./orderService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const ensureTrailingSlash = (value) =>
  value?.endsWith("/") ? value : `${value || "http://localhost:3000"}/`;

export const createFrontendUrl = (path = "") => {
  const baseUrl = ensureTrailingSlash(process.env.FRONTEND_URL || "http://localhost:3000/");
  return new URL(path.replace(/^\//, ""), baseUrl).toString();
};

export const getTotalShippingFeeFromCart = (cartItems = []) =>
  cartItems.reduce(
    (total, item) => total + Number(item.shippingFee || 0) * Number(item.quantity || 0),
    0
  );

export const buildStripeLineItems = (cartItems = [], totalShippingFee = 0) => {
  const productLineItems = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.product_name,
        description: `Category: ${item.product_category}, Size: ${item.size}`,
        images: item.product_img_urls?.[0]
          ? [`https://res.cloudinary.com/sunnysingh78376/image/upload/${item.product_img_urls[0]}`]
          : [],
        metadata: {
          item_type: "product",
          product_id: String(item.product_id),
          size: item.size || "",
        },
      },
      unit_amount: Math.round(Number(item.product_price) * 100),
    },
    quantity: Number(item.quantity),
  }));

  if (Number(totalShippingFee) > 0) {
    productLineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Shipping Fee",
          description: "Order delivery charges",
          metadata: {
            item_type: "shipping",
          },
        },
        unit_amount: Math.round(Number(totalShippingFee) * 100),
      },
      quantity: 1,
    });
  }

  return productLineItems;
};

export const parseStripeLineItems = (lineItems = []) => {
  const cartItems = [];
  let totalShippingFee = 0;

  for (const lineItem of lineItems) {
    const productMetadata = lineItem.price?.product?.metadata || {};
    const itemType = productMetadata.item_type || "product";

    if (itemType === "shipping") {
      totalShippingFee += Number(lineItem.amount_total || 0) / 100;
      continue;
    }

    const quantity = Number(lineItem.quantity || 1);

    cartItems.push({
      product_id: Number(productMetadata.product_id),
      product_name: lineItem.description,
      quantity,
      size: productMetadata.size || null,
      product_price: Number(lineItem.amount_total || 0) / 100 / quantity,
    });
  }

  return { cartItems, totalShippingFee };
};

export const createCheckoutSessionService = async ({ cartItems, userData, userId }) => {
  const totalShippingFee = getTotalShippingFeeFromCart(cartItems);
  const lineItems = buildStripeLineItems(cartItems, totalShippingFee);

  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: createFrontendUrl("success?session_id={CHECKOUT_SESSION_ID}"),
    cancel_url: createFrontendUrl("cancel"),
    client_reference_id: userId ? String(userId) : undefined,
    metadata: {
      userData: JSON.stringify({
        ...userData,
        paymentMode: "STRIPE",
      }),
      totalShippingFee: String(totalShippingFee),
    },
  });
};

export const processPaidCheckoutSession = async (sessionId, stripeClient = stripe) => {
  const session = await stripeClient.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return {
      success: true,
      payment_status: session.payment_status,
      sessionId: session.id,
    };
  }

  const lineItems = await stripeClient.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  });
  const { cartItems, totalShippingFee } = parseStripeLineItems(lineItems.data);
  const userData = JSON.parse(session.metadata?.userData || "{}");
  const userId = session.client_reference_id ? Number(session.client_reference_id) : null;
  const totalAmount = Number(session.amount_total || 0) / 100;

  const orderResponse = await addOrdersService(
    userData,
    cartItems,
    {
      totalAmount,
      totalShippingFee:
        Number(session.metadata?.totalShippingFee || 0) || totalShippingFee,
    },
    session.id,
    userId,
    {
      paymentMethod: "STRIPE",
      paymentStatus: "Paid",
      sendConfirmationEmail: true,
    }
  );

  return {
    ...orderResponse,
    payment_status: session.payment_status,
    customer_email: session.customer_details?.email || userData.email,
    total_amount: session.amount_total,
    userData,
    sessionId: session.id,
    orderId: orderResponse.orderId,
  };
};
