export const ensureUserAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if(!req.user.isadmin)
        next(); // Proceed to the next middleware if authenticated
        else{
            res.status(403).json({message : "Access denied: Users only"})
        }
    } else {
        res.status(401).json({login : false, message: "Unauthorized: Please login to access" });
    }
};

export const ensureAdminAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.isadmin) {
            next(); // User is authenticated and an admin, proceed
        } else {
            res.status(403).json({ message: "Access denied: Admins only" }); // Forbidden for non-admin users
        }
    } else {
        res.status(401).json({ message: "Unauthorized: Please login to access" }); // User not authenticated
    }
};