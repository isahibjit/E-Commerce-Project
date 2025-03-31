import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./Routes/userRoutes.js";
import db from "./Config/db.js";
import morgan from "morgan";
import session from "express-session"
import "./Config/passport.js"
import passport from "passport";
import adminRoutes from "./Routes/adminRoutes.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"))

//creating a session here !
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/admin",adminRoutes)
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Working Now");
});




async function initDb() {
    try {
        await db.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255),
                isAdmin BOOLEAN DEFAULT FALSE,
                CONSTRAINT unique_email UNIQUE (email)
            )`
        );
    
    } catch (error) {
        console.log("Error Connecting to the db",error)
    }

}
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend running on Port ${PORT}`)
    })
})