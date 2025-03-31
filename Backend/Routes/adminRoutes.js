import express from "express"
import { ensureAdminAuthenticated } from "../Middlewares/ensureAuthenticated.js"
import { validateUser } from "../Middlewares/validateUser.js"
import { registerAdmin } from "../Controller/adminController.js"
import passport from "passport"
import { restrictAdminLoginRoute } from "../Middlewares/restrictRoute.js"
import { logout } from "../Middlewares/logout.js"
const router  = express.Router()

router.get("/home",ensureAdminAuthenticated,(req,res)=>{
    res.json({message : "Welcome to admin page"})    
})

router.post("/register",validateUser,registerAdmin)

router.post("/login",passport.authenticate("local"),restrictAdminLoginRoute,(req,res)=>{
    res.json({ message: "Admin Successfully Logged In", user: req.user });
})
router.get("/logout",logout,(req,res)=>{
    res.status(200).json({message : "Admin is Successfully Logged Out"})
})


export default router