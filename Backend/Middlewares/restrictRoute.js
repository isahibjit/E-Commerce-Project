import db from "../Config/db.js"


export const restrictAdminLoginRoute = async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user && !req.user.isadmin) {
            res.status(403).json({ message: "Access denied : Users cannot use this route to login" })
        } else {
            next()
        }
    }
    else {
        try {
            const { email } = req.body
            const result = await db.query("SELECT isadmin from users WHERE email = $1", [email])

            if (result.rows.length > 0) {
                const isAdmin = result.rows[0].isadmin
                if (isAdmin)
                    return next()
                else
                    return res.status(403).json({ message: "Access denied: Users cannot use this route to login" })
            }
            else {
                return res.status(404).json({ message: "User not Found!" })
            }
        } catch (error) {
            return res.status(500).json({ message: "An error Occurred", error })
        }
    }
}


export const restrictUserLoginRoute = async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user && req.user.isadmin) {
            res.status(403).json({ message: "Access denied : Users cannot use this route to login" })
        } else {
            next()
        }
    }
    else {
        try {
            const { email } = req.body
            const result = await db.query("SELECT isadmin from users WHERE email = $1", [email])
            if (result.rows.length > 0) {
                const isAdmin = result.rows[0].isadmin
                if (isAdmin)
                    return next()
                else 
                    return res.status(403).json({ message: "Access denied: Admins cannot use this route to login" })
                
            }
            else
                return res.status(404).json({message : "Not Registered !"})
        } catch (error) {
            return res.status(500).json({ message: "An error Occurred", error })
        }
    }
}