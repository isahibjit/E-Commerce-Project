import { addOrdersService, getOrdersByUserIdService, getOrdersService, updateOrderService } from "../Services/orderService.js";

export const addOrders = async (req, res) => {
    const userId = req.user?.id;
    const { userData, cartData, sessionId, paymentInfo } = req.body;
    console.log("this is body", req.body)
    try {
        if (!userId || !userData || !cartData || !paymentInfo) {
            return res.status(400).json({ error: "Missing required order information." });
        }

        const response = await addOrdersService(userData, cartData, paymentInfo, sessionId, userId);

        if (response.success) {
            return res.status(201).json({
                message: "Order has been placed successfully!",
                orderId: response.orderId,
            });
        }

        return res.status(500).json({ error: "Failed to place the order." });
    } catch (error) {
        console.error("Add order error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};


export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await getOrdersService(userId);

        if (result.success) {
            res.status(200).json({
                success: true,
                orders: result.orders,
                message: result.message || 'Orders fetched successfully.'
            });
        } else {
            res.status(500).json({
                success: false,
                message: result.message || 'Something went wrong while fetching orders.'
            });
        }
    } catch (error) {
        console.error('Error in getOrdersByUserId:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};
export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = req.query.page || 1; // Default to page 1 if not provided
        const result = await getOrdersByUserIdService(userId, page);

        if (result.success) {
            res.status(200).json({
                success: true,
                orders: result.orders,
                message: result.message || 'Orders fetched successfully.'
            });
        } else {
            res.status(500).json({
                success: false,
                message: result.message || 'Something went wrong while fetching orders.'
            });
        }
    } catch (error) {
        console.error('Error in getOrdersByUserId:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
}

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { order_status } = req.body;
    const response = await updateOrderService(orderId, order_status)
    console.error(response)
    if (response.success) {
        return res.status(200).json({
            message: "Order has been updated successfully!",
            orderId: response.orderId,
        });
    }
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
  }
}