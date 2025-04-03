import { addProductsService, getProductByIdService, getProductByUserIdService, getProductService, deleteProductService, updateProductService } from "../Services/productService.js"

export const getProducts = async (req, res) => {
    try {
        const {products } = await getProductService()
        
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
        console.log(req.user.id)
        const {product } = await addProductsService(productData, req.user.id)
        console.log("This is running ",product)
        return res.status(201).json({ message: "Product Added Successfully", product })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params
        const {product } = await getProductByIdService(productId)

        return res.status(200).json({ message: "Product Retrieved Successfully", product })

    } catch (error) {
        if (error.message === "Empty")
            return res.status(404).json({ message: "Product Not Found" })
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const getProductByUserId = async(req,res)=>{
    try {
        const {userId} = req.params
        const {products} = await getProductByUserIdService(userId) 
        return res.status(200).json({message : "Products Uploaded by Admin are Retrieved",products})

    } catch (error) {
        if(error.message === "Empty")
            return res.status(404).json({message : "Products not Found, Admin may have not listed anything yet"})
        return res.status(500).json({message : "Internal Server Error",error : error.message})
    }
}
export const deleteProduct = async(req,res)=>{
    // Check , is the product mentioned by user belongs to user or not ? 
    try {
    const {productId} = req.params
    const userId = req.user?.id || (() => { throw new Error("User ID is missing"); })();

    const isDelete =  await deleteProductService(productId,userId)

    if(isDelete){
        res.status(200).json({message : "Deleted Successfully"})
    }
    } catch (error) {
        if(error.message === "Empty"){
            return res.status(404).json({message : "Product Not Found For the Deletion Method"})
        }   
        else if(error.message === "NotYou"){
            return res.status(403).json({message : "You're not authorized to delete someone's Product Get Lost!"})
        }
        res.status(500).json({message : "Internal Server Error Occurred Can't Delete Product",error : error.message})
    }
}
export const updateProduct = async(req,res)=>{
    try {
        const {productId} = req.params
        const newData = req.body
        const userId = req.user?.id || (() => { throw new Error("User ID is missing"); })();
        const updatedProduct = await updateProductService(productId,newData,userId)
        if(updateProduct){
            return res.status(200).json({message : "Product Updated Successfully",updatedProduct})
        }

    } catch (error) { if(error.message === "Empty"){
            return res.status(404).json({message : "Product Not Found For the Updation Method"})
        }   
        else if(error.message === "NotYou"){
            return res.status(403).json({message : "You're not authorized to Update someone's Product Get Lost!"})
        }
        res.status(500).json({message : "Internal Server Error Occurred Can't Update Product",error : error.message})
    }
}
