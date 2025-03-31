import express from "express"
import { getUsers, registerUser,getUser,updateUser, deleteUser } from "../Controller/userController.js"
import { validateUser } from "../Middlewares/validateUser.js"
import passport from "passport"
import { ensureUserAuthenticated } from "../Middlewares/ensureAuthenticated.js"
import { restrictUserLoginRoute } from "../Middlewares/restrictRoute.js"
import {logout} from "../Middlewares/logout.js"
const router = express.Router() 

router.get("/",getUsers)

// router.get("/:id",getUser)

router.get("/home",ensureUserAuthenticated,(req,res)=>{
    res.json({message : "Welcome to user home page"})    
})

router.post("/register",validateUser,registerUser)

router.post("/login",
    passport.authenticate("local"), // Authenticate user
    restrictUserLoginRoute,
    (req, res) => {
        res.json({ message: "Successfully Logged In", user: req.user });
    }
);
router.get("/logout",logout,(req,res)=>{
    res.status(200).json({message : "User is Successfully Logged Out"})
})

router.put("/:id",updateUser)

router.delete("/:id",deleteUser)



export default router


