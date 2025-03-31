export const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            console.log("Error in logout ")
            return  next(err)
        }
        console.log("It's working !");
        next()
    })
}