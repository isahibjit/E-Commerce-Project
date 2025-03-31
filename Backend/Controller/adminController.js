import db from "../Config/db.js"
import bcrypt from "bcrypt"

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await db.query("INSERT INTO users (name, email, password, isadmin) VALUES ($1,$2,$3,TRUE) RETURNING *", [name, email, hashedPassword])
        const adminUser = result.rows[0]
        req.login(adminUser, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "admin registered but login failed",
                    admin: adminUser,
                    error: err.message
                })
            }
            res.status(201).json({
                message: "Successfully Added and logged in the User",
                admin: adminUser
            })
        })
    } catch (error) {
        res.status(500).json({ message: "Error Creating the admin", error: error.message })
    }
}