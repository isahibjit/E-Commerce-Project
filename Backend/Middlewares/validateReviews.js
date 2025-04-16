const validateReview = (req, res, next) => {
    const { productId, rating, comment } = req.body;


    if (!productId && !rating) {
        return res.status(400).json({ success: false, message: "Product ID and rating are required" });
    }


    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: "Rating must be a number between 1 and 5" });
    }

    if (comment && comment.length > 500) {
        return res.status(400).json({ success: false, message: "Comment is too long (max 500 characters)" });
    }

    next();
};

export default validateReview;
