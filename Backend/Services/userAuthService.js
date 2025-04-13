import db from "../Config/db.js"
import bcrypt from "bcrypt"
import { generateResetToken, verifyToken } from "../Config/JWT.js"
import { sendRegisteredUser, sendResetEmail } from "../utils/nodemailer.js"
export const registerUserService = async (userData) => {

    try {
        const { name, email, password } = userData
        const hashedPassword = password && password.trim() !== "" ? await bcrypt.hash(password, 10) : null
        const result = await db.query(`INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *`, [name, email, hashedPassword])
        const user = result.rows[0]
        await sendRegisteredUser(email,user.name)
        return {user}
    } catch (error) {
        if (error.constraint === "unique_email") {
            console.log("Same Error ")
            throw new Error ("Email is already taken")
        }
        throw new Error("Failed to add the user: " + error.message)

    }
}
export const forgotPasswordService =async (email)=>{
    try {
        if (!email || email.trim() === "") {
            throw new Error("Email is required");
          }

        const token = generateResetToken(email)
        const resetLink = `http://localhost:5173/reset-password?token=${token}`
        try {
            const  info =  await sendResetEmail(email,resetLink)
            return {success : true, message : "Email is sent to your email",info}
        } catch (emailError) {
            console.error("Email sending failed:", emailError.message);
            throw new Error("Failed to send reset email. Please try again.");
        }
      
    } catch (error) {
        throw {
            success : false,
            message : error.message || "Something went wrong while resetting your password"
        }
    }
}
export const resetPasswordService = async(password,token)=>{
    try {
        const decoded = verifyToken(token)
        const email = decoded.email
        console.log(decoded)
        const hashedPassword = password && password.trim() !== "" ? await bcrypt.hash(password, 10) : null
        const result = await db.query("UPDATE  users set password = $1 WHERE email = $2 RETURNING email",[hashedPassword,email])
        if(result.rows[0]){
            return {updated : true, message : "Your Password has been updated"}
        }
    } catch (error) {
        throw error
    }
}