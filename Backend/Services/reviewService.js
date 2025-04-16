import db from "../Config/db.js"

export const getReviewsService = async (productId) => {
    try {
        const result = await db.query(`SELECT name,rating, comment FROM reviews
                                        JOIN users on users.id =reviews.user_id 
                                        WHERE product_id = $1
                                        ORDER BY created_at ASC `, [productId])
        return result.rows
    } catch (error) {
        console.log("error getting reviews", error)
        throw error
    }
}

export const addReviewsService = async (data) => {
    try {
        const { productId, userId, rating, comment } = data;
        const result = await db.query(
            `INSERT INTO reviews (product_id, user_id, rating, comment) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [productId, userId, rating, comment]
        );

        if (result.rows.length > 0) {
            return {
                success: true,
                review: result.rows[0]
            };
        } else {
            return { success: false };
        }

    } catch (error) {
        console.error("Error occurred while inserting the review:", error);
        throw error;
    }
};
export const deleteReviewsService = async (productId, userId) => {
    try {
        const result = await db.query(`DELETE FROM reviews WHERE product_id = $1 AND user_id = $2 RETURNING *`, [productId, userId])
        if (result.rowCount > 0) {
            return { success: true }
        }
        else {
            return { success: false }
        }
    } catch (error) {
        console.log("Error occurred while deleting the reviews", error)
        throw error
    }
}