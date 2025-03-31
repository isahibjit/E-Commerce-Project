import Strategy from "passport-local"
import passport from "passport"
import bcrypt from "bcrypt"
import db from "./db.js"


passport.serializeUser((user,cb)=>{
    cb(null,user.id)
})
passport.deserializeUser(async (id, cb)=>{
    try {
        const userResult = await db.query("SELECT * FROM users WHERE id = $1",[id])
        const user  = userResult.rows[0]
        cb(null,user)
    } catch (error) {
        cb(error, false, {message : "Couldn't deserialize it lol"})
        
    }
})
// for login
passport.use(new Strategy({usernameField : "email"},
    async function verify(email, password, cb){
        try {
            const  result = await db.query("SELECT * FROM users WHERE email = $1",[email])
            if(result.rows.length > 0){
                const user = result.rows[0]
                const storedHashedPassword = user.password
                bcrypt.compare(password,storedHashedPassword,(err,valid)=>{
                    if(err){
                        return cb(err)
                    }
                    else{
                        if(valid)
                            return cb(null, user)
                        // Did not pass the password check
                        return cb(null,false, {message : "Incorrect Password"})
                    }
                })
            }
            else{
                cb(null,false,{message : "User not Found"})
            }
        } catch (error) {
            return cb(error, false)
        }
    }
))