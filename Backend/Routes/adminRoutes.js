import express from "express"
import { ensureAdminAuthenticated } from "../Middlewares/ensureAuthenticated.js"
import { validateUser } from "../Middlewares/validateUser.js"
import { registerAdmin } from "../Controller/adminController.js"
import passport from "passport"
import { restrictAdminLoginRoute } from "../Middlewares/restrictRoute.js"
import { logout } from "../Middlewares/logout.js"
const router  = express.Router()

router.get("/dashboard",ensureAdminAuthenticated,(req,res)=>{
    res.json({message : "Welcome to admin page"})    
})

router.post("/register",validateUser,registerAdmin)


router.post("/login",restrictAdminLoginRoute, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        // Internal server error
        return res.status(500).json({ message: "An error occurred during authentication.", error: err.message });
      }
      if (!user) {
        // Authentication failed
        return res.status(401).json({ message: info.message || "Authentication failed." });
      }
      req.logIn(user, (err) => {
        if (err) {
          // Login failure
          return res.status(500).json({ message: "Login failed.", error: err.message });
        }
        // Successful login
        return res.status(200).json({ message: "Admin Successfully Logged In", user });
      });
    })(req, res, next);
  });

router.get("/logout",logout,(req,res)=>{
    res.status(200).json({message : "Admin is Successfully Logged Out"})
})


export default router