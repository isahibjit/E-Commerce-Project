import { url } from "node:inspector";
import db from "../Config/db.js";
import cloudinary from "../utils/cloudinary.js";
import { unlink } from "node:fs";

export const getProductService = async (isBestseller) => {

    try {
        let query = `
        SELECT 
            p.product_id, 
            p.product_name,
            p.product_category, 
            p.product_description,
            p.product_price, 
            MIN(pi.product_img_url) AS product_img_url
        FROM 
            products p
        INNER JOIN 
            product_images pi ON p.product_id = pi.product_id
    `;
        const values = []
        if (isBestseller) {
            query += ` WHERE p.best_seller = $1 `
            values.push(true)
        }
        query += `
            GROUP BY 
                p.product_id, p.product_name, p.product_category, p.product_price, p.product_description
            ORDER BY  
                p.product_created_at DESC 
            LIMIT 12;
        `


        const result = await db.query(query, values);
        if (result.rows.length > 0) {
            const products = result.rows;
            return { products };
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        console.log(error)
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
            console.log(size);
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
                userId,
            ]
        );

        if (result.rows.length > 0) {
            console.log(result.rows[0]);
            return { productId: result.rows[0].product_id };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};
export const getProductByIdService = async (productId) => {
    try {
        const result = await db.query(
            `SELECT
            p.product_id,
            p.product_name,
            p.product_category,
            p.product_description,
            p.best_seller,
            p.type,
            p.size,
            p.product_price,
            p.stock_quantity,
            ARRAY_AGG(pi.product_img_url) AS product_img_urls
        FROM
            products p
        INNER JOIN
            product_images pi ON p.product_id = pi.product_id
        WHERE
            p.product_id = $1
        GROUP BY
            p.product_id, p.product_name, p.product_category, p.product_description, 
            p.best_seller, p.type, p.size, p.product_price, p.stock_quantity
        ORDER BY
            p.product_created_at DESC;`,
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
    console.log(userId)
    try {
        const result = await db.query(
            `SELECT 
                p.product_id, 
                p.product_name,
                p.product_category, 
                p.product_description,
                p.best_seller,
                p.type,
                p.size,
                p.product_price, 
                p.stock_quantity,
                MIN(pi.product_img_url) AS product_img_url
                FROM 
                    products p
                INNER JOIN 
                    product_images pi ON p.product_id = pi.product_id
                WHERE 
                    p.user_id = $1
                GROUP BY 
        p.product_id, p.product_name, p.product_category,p.product_description,p.best_seller,p.type,p.size, p.product_price ,p.stock_quantity
        ORDER BY  p.product_created_at DESC
        ;`,
            [userId]
        );
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
            "UPDATE  products SET product_name = $1, product_price = $2, size = $3,best_seller = $4,stock_quantity = $5,type = $6,  product_category = $7, product_description = $8 WHERE product_id = $9 AND user_id = $10 RETURNING *",
            [
                productName,
                productPrice,
                size,
                bestSeller,
                stockQuantity,
                type,
                productCategory,
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

export const uploadImageService = async (productId, files) => {
    try {
        // allow  queries to be added perfectly
        let imageUrls = [];
        if (Array.isArray(files)) {
            imageUrls = await Promise.all(
                files.map(async (file) => {
                    try {
                        const uploadResult = await cloudinary.uploader.upload(file.path);
                        unlink(file.path, (err) => {
                            if (err) throw err;
                        });
                        console.log(uploadResult)
                        const secureUrl = `${uploadResult.public_id}.${uploadResult.format}`
                        await db.query(
                            "INSERT INTO product_images (product_id, product_img_url) VALUES($1,$2)",
                            [productId, secureUrl]
                        );
                        return secureUrl;
                    } catch (error) {
                        console.log(error);
                        try {
                            unlink(file.path, (err) => {
                                if (err) throw err;
                            });
                        } catch (unlinkErr) {
                            console.error(
                                "Error deleting file after failed upload:",
                                unlinkErr
                            );
                        }
                    }
                })
            );
            return imageUrls.filter((url) => url !== null);
        }
        return [];
    } catch (error) {
        throw error;
    }
};
export const filterProductService = async (filters) => {
    try {
        let query = `
        SELECT 
            p.product_id, 
            p.product_name,
            p.product_category, 
            p.product_description,
            p.product_price, 
            MIN(pi.product_img_url) AS product_img_url
        FROM 
            products p
        INNER JOIN 
            product_images pi ON p.product_id = pi.product_id
    `;
        const values = []
        const andClauses = []
        console.log("I'm at filter right now ", filters)
        let paramIndex = 1
        if (filters.type && filters.type.length > 0) {
            const typesClause = filters.type.map(() => `p.type = $${paramIndex++}`)
            andClauses.push(`(${typesClause.join(" OR ")})`)
            values.push(...filters.type)
        }
        if (filters.category && filters.category.length > 0) {
            const categoriesClause = filters.category.map(() => `p.product_category = $${paramIndex++}`)
            andClauses.push(`(${categoriesClause.join(" OR ")})`)
            values.push(...filters.category)
        }
        if(filters.productId ) {
            const productIdClause = `p.product_id != $${paramIndex}`
            andClauses.push(productIdClause)
            values.push(filters.productId)
        }
        if (andClauses.length > 0) {
            query += `WHERE ${andClauses.join(" AND ")}`
        }
        query += `
            GROUP BY 
                p.product_id, p.product_name, p.product_category, p.product_price, p.product_description
            
        `
        console.log("this is filters query", filters.sort)
        if (filters.sort !== "default") {
            query += `ORDER BY
                p.product_price ${filters.sort}
                `
        }
        else {
            query += `ORDER BY  
            p.product_created_at DESC 
            `
        }
        // pagination
        const limit = 12
        const page = filters.page && filters.page > 0 ? filters.page : 1
        const offset = (page - 1) * limit
        query += `LIMIT ${limit} OFFSET ${offset};`

        console.log(query)
        const result = await db.query(query, values);
        if (result.rows.length > 0) {
            const products = result.rows;
            return { products };
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}