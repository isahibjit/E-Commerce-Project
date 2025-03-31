export const validateUser = (req,res,next)=>{
    const {name, email, password} = req.body
    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Name is required" });
    }
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    
    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    next(); // Pass control to the next middleware
}