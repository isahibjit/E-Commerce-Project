import test from "node:test";
import assert from "node:assert/strict";

const { buildInvoiceFileName, generateInvoicePdfBuffer } = await import("../Services/invoiceService.js");

const sampleOrder = {
  order_id: 42,
  invoice_number: "INV-2026-000042",
  created_at: "2026-06-06T10:15:00.000Z",
  first_name: "Ada",
  last_name: "Lovelace",
  street: "12 Binary Road",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411001",
  country: "India",
  email: "ada@example.com",
  phone: "9999999999",
  payment_method: "STRIPE",
  payment_status: "Paid",
  order_status: "Order Placed",
  subtotal: 1598,
  shipping_fee: 80,
  total_amount: 1678,
  items: [
    {
      product_name: "Linen Shirt",
      quantity: 2,
      size: "L",
      unit_price: 799,
      line_total: 1598,
    },
  ],
};

test("buildInvoiceFileName derives a stable pdf file name", () => {
  assert.equal(buildInvoiceFileName(sampleOrder), "inv-2026-000042.pdf");
});

test("generateInvoicePdfBuffer returns a pdf buffer", async () => {
  const pdfBuffer = await generateInvoicePdfBuffer(sampleOrder);

  assert.ok(Buffer.isBuffer(pdfBuffer));
  assert.ok(pdfBuffer.length > 500);
  assert.equal(pdfBuffer.subarray(0, 4).toString(), "%PDF");
});
