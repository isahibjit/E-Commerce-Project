import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./Config/db.js";
import morgan from "morgan";
import session from "express-session"
import "./Config/passport.js"
import passport from "passport";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js"
import productRoutes from "./Routes/productRoutes.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from your frontend
      credentials: true, // Allow cookies to be sent
    })
  )
  
app.use(morgan("dev"))

//creating a session here !
app.use(session({
    secret: process.env.SESSION_SECRET || "country",
    resave: false,
    saveUninitialized: false,
    cookie  : {
        maxAge : 30*60*1000,
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    }
}));
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/admin",adminRoutes)
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes)

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
         // Create ENUM types for category and type (if not exist)
         await db.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_enum') THEN
                    CREATE TYPE category_enum AS ENUM ('Men', 'Women', 'Kids');
                END IF;
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'type_enum') THEN
                    CREATE TYPE type_enum AS ENUM ('Topwear', 'Bottomwear', 'Winterwear');
                END IF;
            END $$;
        `);

        // Create Products Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                product_price DECIMAL(10,2) NOT NULL,
                size TEXT[], 
                best_seller BOOLEAN  DEFAULT false,
                stock_quantity INT NOT NULL DEFAULT 0,
                type type_enum NOT NULL,
                product_category category_enum NOT NULL,
                product_description TEXT,
                user_id INT NOT NULL,
                product_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        

        console.log("Database initialized successfully!");

    


    
    } catch (error) {
        console.log("Error Connecting to the db",error)
    }

}
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend running on Port ${PORT}`)
    })
})