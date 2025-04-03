import db from "../Config/db.js"
import bcrypt from "bcrypt"
export const registerAdminService = async (userData) => {

    try {
        const { name, email, password } = userData
        const hashedPassword = password && password.trim() !== "" ? await bcrypt.hash(password, 10) : null
        const result = await db.query(`INSERT INTO users(name, email, password, isadmin) VALUES ($1,$2,$3,TRUE)  RETURNING *`, [name, email, hashedPassword])
        const userAdmin = result.rows[0]
        return {success : true, userAdmin}
    } catch (error) {
        if (error.constraint === "unique_email") {
            console.log("Same Error ")
            throw new Error ("Email is already taken")
        }
        throw new Error("Failed to add the user ",+error.message)
    }
}