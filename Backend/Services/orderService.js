import db from "../Config/db.js";
import { sendOrderConfirmationEmail, sendOrderUpdateEmail } from "../utils/nodemailer.js";

export const addOrdersService = async (userData, cartData, paymentInfo, sessionId, userId) => {
    const {
        firstName,
        lastName,
        street,
        city,
        state,
        pincode,
        country,
        email,
        phone,
        paymentMode
    } = userData;

    const { totalAmount, totalShippingFee } = paymentInfo;
    const paymentStatus = paymentMode === 'STRIPE' ? 'Paid' : 'Pending';
    const subtotal = totalAmount - totalShippingFee;

    try {
        await db.query('BEGIN');

        // 👉 Check if order already exists with the same session_id
        const existingOrder = await db.query(
            'SELECT order_id FROM orders WHERE session_id = $1',
            [sessionId]
        );

        if (existingOrder.rows.length > 0) {
            const orderId = existingOrder.rows[0].order_id;
            await db.query('COMMIT');

            // 👇 Return like a success, don't treat it like an error
            return {
                success: true,
                orderId,
                message: 'Order already exists for this session, skipping insert.'
            };
        }

        // 🆕 Proceed to insert new order
        const orderQuery = `
            INSERT INTO orders (
                session_id, user_id, first_name, last_name, street, city, state, pincode, country,
                email, phone, payment_method, payment_status, order_status,
                subtotal, shipping_fee, total_amount
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,
                      $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *
        `;

        const orderValues = [
            sessionId, userId, firstName, lastName, street, city, state, pincode, country,
            email, phone, paymentMode, paymentStatus, 'Order Placed',
            subtotal, totalShippingFee, totalAmount
        ];

        const orderResult = await db.query(orderQuery, orderValues);
        
        const order = orderResult.rows[0];
        await sendOrderConfirmationEmail(order.email, order.first_name, order);

        const orderId = orderResult.rows[0].order_id;

        // ➕ Insert order items
        for (const item of Object.values(cartData)) {
            const itemQuery = `
                INSERT INTO order_items (
                    order_id, product_id, quantity, size, unit_price
                ) VALUES ($1, $2, $3, $4, $5)
            `;
            const itemValues = [
                orderId,
                item.product_id,
                item.quantity,
                item.size,
                item.product_price
            ];
            await db.query(itemQuery, itemValues);
            const updateStockQuery = `
            UPDATE products
            SET stock_quantity = stock_quantity - $1
            WHERE product_id = $2 AND stock_quantity >= $1
            `
            const updateStockValue = [
                item.quantity,
                item.product_id
            ]
            const stockResult = await db.query(updateStockQuery,updateStockValue);
            if(stockResult.rowCount === 0){
                throw new Error(`Insufficient stock for product_id: ${item.product_id}, size: ${item.size}`);
            }
        }

        await db.query('COMMIT');
        return { success: true, orderId };
    } catch (error) {
        await db.query('ROLLBACK');

        // ⚠️ Optional: Only log actual errors, not constraint failures
        console.error('Order service error:', error);

        return { success: false, error: 'Order placement failed' };
    }
};

export const getOrdersService = async (userId) => {
    try {
        const result = await db.query(
            `SELECT 
    p.product_id,
    p.product_name, 
    oi.quantity, 
    oi.size, 
    o.total_amount, 
    o.created_at, 
    o.order_status, 
    o.payment_method,
        MIN(pi.product_img_url) AS product_img_url
    FROM 
        order_items oi
    JOIN 
        products p ON oi.product_id = p.product_id
    JOIN 
        orders o ON oi.order_id = o.order_id
    JOIN 
        product_images pi ON p.product_id = pi.product_id
    WHERE 
        o.user_id = $1
    GROUP BY 
        p.product_id,
        p.product_name, 
        oi.quantity, 
        oi.size, 
        o.total_amount, 
        o.created_at, 
        o.order_status, 
        o.payment_method
    ORDER BY 
        o.created_at DESC;

    `,
            [userId]
        );

        if (result.rows.length > 0) {
            return {
                success: true,
                orders: result.rows
            };
        } else {
            return {
                success: true,
                orders: [],
                message: 'No orders found for this user.'
            };
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        return {
            success: false,
            message: 'Failed to fetch orders.',
            error: error.message
        };
    }
};
export const getOrdersByUserIdService = async (userId, page, limit = 12) => {
    const offset = (page - 1) * 12;

    try {
        const result = await db.query(
            `SELECT 
                o.order_id,
                o.first_name, 
                o.last_name, 
                ARRAY_AGG(DISTINCT p.product_name) AS product_names,
                ARRAY_AGG(oi.quantity) AS quantities,
                ARRAY_AGG(oi.size) AS sizes,
                o.total_amount, 
                o.payment_method,
                o.order_status, 
                o.payment_status,
                o.created_at, 
                o.pincode
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN products p ON oi.product_id = p.product_id
            WHERE p.user_id = $1
            GROUP BY o.order_id, o.first_name, o.last_name, o.total_amount, 
                     o.payment_method, o.order_status, o.payment_status, 
                     o.created_at, o.pincode
            ORDER BY o.created_at DESC
            LIMIT $2 OFFSET $3
            `,
            [userId, limit, offset]
        );

        return {
            success: true,
            orders: result.rows
        };
    } catch (error) {
        console.error('Error fetching paginated orders:', error);
        return {
            success: false,
            message: 'Failed to fetch orders.',
            error: error.message
        };
    }
};
export const updateOrderService = async (orderId, orderStatus) => {
    try {
        const result = await db.query("UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *", [orderStatus, orderId]);
        if (result.rowCount > 0) {
            const order = result.rows[0];
            await sendOrderUpdateEmail(order)
            return {
                success: true,
                message: "Order updated successfully."
            };
        } else {
            return {
                success: true,
                message: "Order not found."
            };
        }
    } catch (error) {
        throw error; // Rethrow the error to be handled in the controller
    }
}