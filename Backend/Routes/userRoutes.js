import express from "express"
import { getUsers, registerUser, getUser, updateUser, deleteUser, forgotPassword, resetPassword } from "../Controller/userController.js"
import { validateUser } from "../Middlewares/validateUser.js"
import passport from "passport"
import { ensureUserAuthenticated } from "../Middlewares/ensureAuthenticated.js"
import { restrictUserLoginRoute } from "../Middlewares/restrictRoute.js"
import { logout } from "../Middlewares/logout.js"
import Stripe from "stripe"
const router = express.Router()

router.get("/", getUsers)

// router.get("/:id",getUser)

router.get("/auth", ensureUserAuthenticated, (req, res) => {
  res.json({ message: "User is logged in", user: { name: req.user.name, email: req.user.email, login: true } })
})

router.post("/register", validateUser, registerUser)

router.post("/login", restrictUserLoginRoute, (req, res, next) => {
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
      return res.status(200).json({ message: "Successfully Logged In" });
    });
  })(req, res, next);
});



router.get("/logout", logout, (req, res) => {
  res.status(200).json({ message: "User is Successfully Logged Out" })
})

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

router.post("/forgot-password", restrictUserLoginRoute, forgotPassword)
router.post("/reset-password", resetPassword)





export default router


