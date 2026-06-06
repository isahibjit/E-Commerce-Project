import PDFDocument from "pdfkit";
import db from "../Config/db.js";

const formatInvoiceNumber = (orderId, createdAt) => {
  const orderDate = new Date(createdAt);
  return `INV-${orderDate.getFullYear()}-${String(orderId).padStart(6, "0")}`;
};

const formatCurrency = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

export const buildInvoiceFileName = (order) =>
  `${formatInvoiceNumber(order.order_id, order.created_at).toLowerCase()}.pdf`;

export const getInvoiceOrderService = async (orderId, actor) => {
  const normalizedOrderId = Number(orderId);

  if (!normalizedOrderId) {
    return { success: false, status: 400, message: "Invalid order id." };
  }

  const accessQuery = actor.isadmin
    ? `
      SELECT 1
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON p.product_id = oi.product_id
      WHERE o.order_id = $1 AND p.user_id = $2
      LIMIT 1
    `
    : `
      SELECT 1
      FROM orders
      WHERE order_id = $1 AND user_id = $2
      LIMIT 1
    `;

  const accessResult = await db.query(accessQuery, [normalizedOrderId, actor.id]);

  if (accessResult.rowCount === 0) {
    return { success: false, status: 404, message: "Order not found." };
  }

  const orderResult = await db.query(
    `
      SELECT
        order_id,
        session_id,
        first_name,
        last_name,
        street,
        city,
        state,
        pincode,
        country,
        email,
        phone,
        payment_method,
        payment_status,
        order_status,
        subtotal,
        shipping_fee,
        total_amount,
        created_at
      FROM orders
      WHERE order_id = $1
    `,
    [normalizedOrderId]
  );

  const itemsResult = await db.query(
    `
      SELECT
        oi.product_id,
        p.product_name,
        oi.quantity,
        oi.size,
        oi.unit_price,
        (oi.quantity * oi.unit_price) AS line_total
      FROM order_items oi
      JOIN products p ON p.product_id = oi.product_id
      WHERE oi.order_id = $1
      ORDER BY oi.item_id ASC
    `,
    [normalizedOrderId]
  );

  const order = orderResult.rows[0];

  return {
    success: true,
    order: {
      ...order,
      invoice_number: formatInvoiceNumber(order.order_id, order.created_at),
      items: itemsResult.rows,
    },
  };
};

export const generateInvoicePdfBuffer = (order) =>
  new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(24).text("ExtroBuy Invoice");
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor("#555");
    doc.text(`Invoice No: ${order.invoice_number}`);
    doc.text(`Order ID: #${order.order_id}`);
    doc.text(`Order Date: ${new Date(order.created_at).toLocaleString("en-IN")}`);
    doc.text(`Payment Method: ${order.payment_method}`);
    doc.text(`Payment Status: ${order.payment_status}`);
    doc.text(`Order Status: ${order.order_status}`);
    doc.moveDown();

    doc.fillColor("#111").fontSize(13).text("Billed To");
    doc.fontSize(11);
    doc.text(`${order.first_name} ${order.last_name}`);
    doc.text(order.email);
    doc.text(order.phone);
    doc.text(`${order.street}, ${order.city}, ${order.state} - ${order.pincode}`);
    doc.text(order.country);
    doc.moveDown();

    const tableTop = doc.y + 10;
    const columns = { item: 50, size: 290, qty: 360, price: 420, total: 500 };

    doc.fontSize(11).text("Item", columns.item, tableTop);
    doc.text("Size", columns.size, tableTop);
    doc.text("Qty", columns.qty, tableTop);
    doc.text("Price", columns.price, tableTop);
    doc.text("Total", columns.total, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).strokeColor("#d1d5db").stroke();

    let rowY = tableTop + 25;
    order.items.forEach((item) => {
      doc.text(item.product_name, columns.item, rowY, { width: 220 });
      doc.text(item.size || "-", columns.size, rowY);
      doc.text(String(item.quantity), columns.qty, rowY);
      doc.text(formatCurrency(item.unit_price), columns.price, rowY);
      doc.text(formatCurrency(item.line_total), columns.total, rowY);
      rowY += 24;
    });

    doc.moveTo(50, rowY).lineTo(545, rowY).strokeColor("#d1d5db").stroke();
    rowY += 16;
    doc.fontSize(11).text(`Subtotal: ${formatCurrency(order.subtotal)}`, 360, rowY);
    rowY += 18;
    doc.text(`Shipping: ${formatCurrency(order.shipping_fee)}`, 360, rowY);
    rowY += 18;
    doc.fontSize(13).text(`Grand Total: ${formatCurrency(order.total_amount)}`, 360, rowY);
    doc.fontSize(10).fillColor("#555").text("Thank you for shopping with ExtroBuy.", 50, rowY + 50);
    doc.end();
  });
