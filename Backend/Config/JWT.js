import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const secret  = process.env.JWT_SECRET

export const generateResetToken = (email)=>{
    return jwt.sign({email},secret,{expiresIn : "15m"})
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token,secret)
    } catch (error) {   
        console.log(error.message)
        throw error
    }
}