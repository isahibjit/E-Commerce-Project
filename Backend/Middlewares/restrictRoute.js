export const restrictUserLoginRoute = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user && req.user.isadmin){
            res.status(403).json({message : "Access denied: Admins cannot use this route to login"})
        }else{
            next()
        }
    }
}

export const restrictAdminLoginRoute = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user && !req.user.isadmin){
            res.status(403).json({message: "Access denied : Users cannot use this route to login"})
        }else{
            next()
        }
    }
    else{

    }
}