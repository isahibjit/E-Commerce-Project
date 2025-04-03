import db from "../Config/db.js"
import bcrypt from "bcrypt"
import { registerAdminService } from "../Services/adminAuthService.js"
import "../Config/passport.js"
export const registerAdmin = async (req, res) => {
    try {
        const userData = req.body
        const {success, userAdmin} = await registerAdminService(userData)
        req.login(userAdmin, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "admin registered but login failed",
                    admin: userAdmin,
                    error: err.message
                })
            }
            res.status(201).json({
                message: "Successfully Added and logged in the User",
                admin: userAdmin
            })
        })
    } catch (error) {
        if(error.message === "Email is already taken"){
            return res.status(409).json({message : error.message})
        }
        res.status(500).json({error :"Internal Server Error : "+error.message})
    }
}