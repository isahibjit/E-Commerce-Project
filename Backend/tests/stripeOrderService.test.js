import test from "node:test";
import assert from "node:assert/strict";

process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_dummy";

const {
  buildStripeLineItems,
  getTotalShippingFeeFromCart,
  parseStripeLineItems,
} = await import("../Services/stripeOrderService.js");

test("getTotalShippingFeeFromCart multiplies shipping by quantity", () => {
  const totalShippingFee = getTotalShippingFeeFromCart([
    { shippingFee: 40, quantity: 2 },
    { shippingFee: 25, quantity: 1 },
  ]);

  assert.equal(totalShippingFee, 105);
});

test("buildStripeLineItems appends a dedicated shipping line item", () => {
  const lineItems = buildStripeLineItems(
    [
      {
        product_id: 12,
        product_name: "Linen Shirt",
        product_category: "Men",
        product_price: 799,
        quantity: 2,
        size: "L",
        product_img_urls: ["folder/image.png"],
      },
    ],
    80
  );

  assert.equal(lineItems.length, 2);
  assert.equal(lineItems[0].price_data.product_data.metadata.product_id, "12");
  assert.equal(lineItems[1].price_data.product_data.metadata.item_type, "shipping");
  assert.equal(lineItems[1].price_data.unit_amount, 8000);
});

test("parseStripeLineItems reconstructs cart items and shipping totals from Stripe data", () => {
  const { cartItems, totalShippingFee } = parseStripeLineItems([
    {
      description: "Linen Shirt",
      quantity: 2,
      amount_total: 159800,
      price: {
        product: {
          metadata: {
            item_type: "product",
            product_id: "12",
            size: "L",
          },
        },
      },
    },
    {
      description: "Order delivery charges",
      quantity: 1,
      amount_total: 8000,
      price: {
        product: {
          metadata: {
            item_type: "shipping",
          },
        },
      },
    },
  ]);

  assert.deepEqual(cartItems, [
    {
      product_id: 12,
      product_name: "Linen Shirt",
      quantity: 2,
      size: "L",
      product_price: 799,
    },
  ]);
  assert.equal(totalShippingFee, 80);
});
