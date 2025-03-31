import db from "../Config/db.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
    try {
        const users = await db.query("SELECT * FROM users")
        res.status(200).send({
            success: true,
            message: "Successfully Retrieved all the data",
            data: users.rows
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "data couldn't be retrieved!"
        })
    }
}
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = password && password.trim() !== "" ? await bcrypt.hash(password, 10) : null
    try {
        const result = await db.query(`INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *`, [name, email, hashedPassword])
        const user = result.rows[0]
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "user registered but login failed",
                    user: user,
                    error: err.message
                })
            }
            res.status(201).json({
                message: "Successfully Added and logged in the User",
                user: user
            })
        })
    } catch (error) {
        if (error.constraint === "unique_email") {
            return res.status(409).json({ message: "Email is already taken" })
        }
        res.status(500).json({ message: "Failed to add the data", error: error.message })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await db.query("SELECT * FROM users WHERE id = $1", [id])

        if (user.rows[0]) {
            res.status(200).send({ success: true, message: "User Data Found !", data: user.rows[0] })
        }
        else {
            res.status(404).send({ success: false, message: "User Not Found !" })
        }
    } catch (error) {
        res.status(200).send({ success: false, message: "Failed to fetch User Data", error: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    try {
        const updatedUser = await db.query("UPDATE users SET name  = $1,  email = $2,  password = $3 WHERE id = $4 RETURNING *", [name, email, password, id])

        if (updatedUser.rows[0]) {
            res.status(200).send({ success: true, message: "User is updated", data: updatedUser.rows[0] })
        }
        else {
            res.status(404).send({ success: false, message: "User not found" })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to update User",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await db.query("DELETE FROM users WHERE id = $1", [id])
        if (result.rowCount > 0)
            return res.status(200).send({ success: true, message: "Successfully Deleted User Data" })
        res.status(404).send({ success: false, message: "User Not Found for the deletion" })
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to Delete User", error: error })
    }
}

