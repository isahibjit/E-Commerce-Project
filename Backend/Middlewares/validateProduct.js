export const validateProduct = (req, res, next) => {
    let {
        productName,
        productPrice,
        size,
        type,
        productCategory,
        productDescription
    } = req.body;
    // Validate productName
    if (!productName || productName.trim() === "") {
        return res.status(400).json({ message: "Product name is required." });
    } else if (productName.length > 100) {
        return res.status(400).json({ message: "Product name must be less than 100 characters." });
    }
   
    // Validate productPrice
    if (!productPrice || isNaN(productPrice) || Number(productPrice) <= 0) {
        return res.status(400).json({ message: "Product price must be a valid positive number." });
    } else if (!/^\d+(\.\d{1,2})?$/.test(productPrice.toString())) {
        return res.status(400).json({ message: "Product price must be a decimal with up to 2 decimal places." });
    }
    


    // Validate type
    const validTypes = ["Topwear", "Bottomwear", "Winterwear"];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: `Type must be one of the following: ${validTypes.join(", ")}.` });
    }

    // Validate productCategory
    const validCategories = ["Men", "Women", "Kids"];
    if (!validCategories.includes(productCategory)) {
        return res.status(400).json({ message: `Product category must be one of the following: ${validCategories.join(", ")}.` });
    }

    // Validate productDescription
    if (!productDescription || productDescription.trim() === "") {
        return res.status(400).json({ message: "Product description is required." });
    } else if (productDescription.length > 1000) {
        return res.status(400).json({ message: "Product description must be less than 500 characters." });
    }
     // Validate size
     if (!size || Array.isArray(size) && size.length === 0) {
        return res.status(400).json({ message: "Size must be a non-empty array of valid size strings." });
    }

    next(); // Pass control to the next middleware
};