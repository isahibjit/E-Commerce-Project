import db from "../Config/db.js";
export const getProductService = async () => {
    try {
        const result = await db.query("SELECT * FROM products");
        if (result.rows.length > 0) {
            const products = result.rows;
            return { products };
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addProductsService = async (productData, userId) => {
    try {
        let {
            productName,
            productPrice,
            size,
            bestSeller,
            stockQuantity,
            type,
            productCategory,
            productDescription,
        } = productData;
        if (typeof size === "string") {
            size = [size]; // Wrap it in an array
            console.log(size)
        }
        // Corrected: Added $9 placeholder for user_id
        const result = await db.query(
            `INSERT INTO products(
                product_name, 
                product_price, 
                size, 
                best_seller,
                stock_quantity, 
                type, 
                product_category, 
                product_description,
                user_id
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                productName,
                productPrice,
                size, // Array (e.g., ['S', 'M', 'L'])
                bestSeller,
                stockQuantity,
                type,
                productCategory,
                productDescription,
                userId, // Now correctly mapped to $9
            ]
        );

        if (result.rows.length > 0) {
            return { product: result.rows[0] };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};
export const getProductByIdService = async (productId) => {
    try {
        const result = await db.query(
            "SELECT * FROM products WHERE product_id = $1",
            [productId]
        );
        if (result.rows.length > 0) {
            const product = result.rows[0];
            return { product };
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
export const getProductByUserIdService = async (userId) => {
    try {
        const result = await db.query("SELECT * FROM products WHERE user_id = $1", [
            userId,
        ]);
        if (result.rows.length > 0) {
            const products = result.rows;
            return { products };
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteProductService = async (productId, userId) => {
    try {
        const result = await db.query(
            "DELETE FROM products WHERE product_id = $1 AND user_id = $2 RETURNING product_id",
            [productId, userId]
        );
        if (result.rows.length > 0) {
            return true;
        }

        //Check if the product exists before throwing an error
        const exists = await db.query(
            "SELECT user_id from products WHERE product_id = $1",
            [productId]
        );
        if (exists.rows.length > 0) {
            throw new Error("NotYou");
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        throw error;
    }
};
export const updateProductService = async (productId, newData, userId) => {
    try {
        console.log(newData.productName);
        const {
            productName,
            productPrice,
            size,
            bestSeller,
            stockQuantity,
            type,
            productCategory,
            productDescription,
        } = newData;
        const updatedProduct = await db.query(
            "UPDATE  products SET product_name = $1, product_price = $2, size = $3,best_seller = $4,stock_quantity = $5, type = $6, product_category = $7, product_description = $8 WHERE product_id = $9 AND user_id = $10 RETURNING *",
            [
                productName,
                productPrice,
                size,
                type,
                productCategory,
                bestSeller,
                stockQuantity,
                productDescription,
                productId,
                userId,
            ]
        );
        if (updatedProduct.rows.length > 0) {
            return updatedProduct.rows[0];
        }

        const exists = await db.query(
            "SELECT user_id from products WHERE product_id = $1",
            [productId]
        );
        if (exists.rows.length > 0) {
            throw new Error("NotYou");
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        throw error;
    }
};
