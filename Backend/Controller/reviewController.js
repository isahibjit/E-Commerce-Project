import { deleteReviewsService, getReviewsService, addReviewsService } from "../Services/reviewService.js";

export const getReviews = async (req, res) => {
    try {
        const { productId } = req.params
        const reviews = await getReviewsService(productId);
        res.status(200).json({ reviews })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}


export const addReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, rating, comment } = req.body;

        const data = { userId, productId, rating, comment };
        const response = await addReviewsService(data);

        if (response.success) {
            return res.status(201).json({ success: true, message: "Review added successfully", review: response.review });
        } else {
            return res.status(500).json({ success: false, message: "Failed to add review" });
        }

    } catch (error) {
        console.error("Error in addReviews controller:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const deleteReviews = async (req, res) => {
    try {

        const { productId } = req.params
        const userId = req.user.id
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const response = await deleteReviewsService(productId, userId)
        if (response.success) {
            return res.status(200).json({ success: true, message: "Review Deleted Successfully" })
        }
        else {
            return res.status(500).json({ success: false, message: "Failed to delete reviews" })
        }
    } catch (error) {
        console.log("Error in deleteReviews controller : ", error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }

}

