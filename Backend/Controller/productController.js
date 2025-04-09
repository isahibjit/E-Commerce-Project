import { addProductsService, getProductByIdService, getProductByUserIdService, getProductService, deleteProductService, updateProductService, uploadImageService, filterProductService } from "../Services/productService.js"

export const getProducts = async (req, res) => {
    try {
        const isBestseller = req.query.bestseller || false
        const queries = req.query
        console.log(queries)
        const { products } = await getProductService(isBestseller)

        return res.status(200).json({ message: "Successfully Retrieved all the products", products })

    } catch (error) {
        if (error.message === "Empty")
            return res.status(404).json({ message: "Products Not Found" })
        return res.status(500).json({ message: "Internal Server Error Occurred" })

    }
}
export const addProducts = async (req, res) => {
    try {
        const productData = req.body
        console.log(productData);

        const { productId } = await addProductsService(productData, req.user.id)
        return res.status(201).json({ message: "Product Added Successfully", productId })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getProductById = async (req, res) => {

    try {
        const { productId } = req.params
        const { product } = await getProductByIdService(productId)

        return res.status(200).json({ message: "Product Retrieved Successfully", product })

    } catch (error) {
        if (error.message === "Empty")
            return res.status(404).json({ message: "Product Not Found" })
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const getProductByUserId = async (req, res) => {
    try {
        const userId = req.user.id // else throw error 
        const { products } = await getProductByUserIdService(userId)
        return res.status(200).json({ message: "Products Uploaded by Admin are Retrieved", products })

    } catch (error) {
        if (error.message === "Empty")
            return res.status(404).json({ message: "Products not Found, Admin may have not listed anything yet" })
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
export const deleteProduct = async (req, res) => {
    // Check , is the product mentioned by user belongs to user or not ? 
    try {
        const { productId } = req.params
        const userId = req.user?.id || (() => { throw new Error("User ID is missing"); })();

        const isDelete = await deleteProductService(productId, userId)

        if (isDelete) {
            res.status(200).json({ message: "Deleted Successfully" })
        }
    } catch (error) {
        if (error.message === "Empty") {
            return res.status(404).json({ message: "Product Not Found For the Deletion Method" })
        }
        else if (error.message === "NotYou") {
            return res.status(403).json({ message: "You're not authorized to delete someone's Product Get Lost!" })
        }
        res.status(500).json({ message: "Internal Server Error Occurred Can't Delete Product", error: error.message })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const newData = req.body
        const userId = req.user?.id || (() => { throw new Error("User ID is missing"); })();
        const updatedProduct = await updateProductService(productId, newData, userId)
        if (updateProduct) {
            return res.status(200).json({ message: "Product Updated Successfully", updatedProduct })
        }

    } catch (error) {
        if (error.message === "Empty") {
            return res.status(404).json({ message: "Product Not Found For the Updation Method" })
        }
        else if (error.message === "NotYou") {
            return res.status(403).json({ message: "You're not authorized to Update someone's Product Get Lost!" })
        }
        res.status(500).json({ message: "Internal Server Error Occurred Can't Update Product", error: error.message })
    }
}

export const uploadImage = async (req, res) => {
    try {
        const { productId } = req.body ? req.body : null
        const files = req.files || req.file
        // get the image from the frontend keep it into the backend for a few seconds then
        //upload it into the cloudinary then get it's url , and add this url in to the 
        // product_images table , with it's corresponding url so when I need to get i'll get it
        // from the table by giving the product_id easy
        const result = await uploadImageService(productId, files)
        if (result) {
            return res.status(201).json({ message: "Images are uploaded ", result })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


export const filterProduct = async (req, res) => {
    try {
        const {type = [],category = [], sort,_page} = req.query || {}
       

        if (req.query.type  || req.query.category || req.query.sort || req.query._page) {
            const types = type.filter((typeQuery) => typeQuery.trim() !== "" && typeQuery.trim() !== null).map((type) => type.trim())
            const categories = category.filter((categoryQuery) => categoryQuery.trim() !== "" && categoryQuery.trim() !== null).map((category) => category.trim()) 
            let filters = {type : null,category : null,sort : null,_page : null}
            if(categories.length > 0){
               filters.category = categories
            }
            if(type.length > 0){
                filters.type = types
            }
            if(sort){
                filters.sort = sort
            }
            if(_page){
                filters._page = _page
            }
            const { products } = await filterProductService(filters)
            return res.status(200).json({ message: "Successfully Retrieved all the products", products })
        }
    
        const { products } = await getProductService()
        return res.status(200).json({ message: "Successfully Retrieved all the products", products })

    } catch (error) {
        if (error.message === "Empty")
            return res.status(404).json({ message: "Products Not Found" })
        return res.status(500).json({ message: "Internal Server Error Occurred", error: error.message })

    }
}