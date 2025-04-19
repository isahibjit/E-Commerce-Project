import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./Config/db.js";
import morgan from "morgan";
import session from "express-session";
import "./Config/passport.js";
import passport from "passport";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js"
import stripeRoutes from "./Routes/stripeRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"
import registerStripeWebhook from "./Stripe/webhook.js";
import pgSession from "connect-pg-simple"
const app = express();
const PgSession = pgSession(session)
dotenv.config();


const PORT = process.env.PORT || 5000;
registerStripeWebhook(app)

app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://e-commerce-project-frontend-3h97.onrender.com", // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
  })
);
app.use(morgan("dev"));

//creating a session here !
app.use(
  session({
    store: new PgSession({
      pool: db,  
      tableName: "session",  
      createTableIfMissing: true,  
    }),
    secret: process.env.SESSION_SECRET || "country",  
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
      secure: true,  // For production
      sameSite: "None",  // For production
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/reviews", reviewRoutes)
app.use("/api/stripe", stripeRoutes)
app.use("/api/orders", orderRoutes)


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
    // Create Product Images Url
    await db.query(`CREATE TABLE IF NOT EXISTS product_images (
                image_id SERIAL PRIMARY KEY,   -- Auto-incrementing unique ID for each image
                product_id INT NOT NULL,       -- Foreign Key referencing Products table
                Product_Img_Url TEXT NOT NULL, -- URL of the product image
                FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);`);
    await db.query(`CREATE TABLE IF NOT EXISTS reviews (
                review_id SERIAL PRIMARY KEY,
                product_id INT NOT NULL, 
                user_id INT NOT NULL,
                rating INT CHECK(rating BETWEEN 1 AND 5),
                comment TEXT, 
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (product_id) REFERENCES products(product_id),
                FOREIGN KEY (user_id) REFERENCES users(id)
        )`)

    await db.query(`
          CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            session_id TEXT UNIQUE ,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            street TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            pincode VARCHAR(20),
            country VARCHAR(100),
            email VARCHAR(255),
            phone VARCHAR(20),
            payment_method VARCHAR(50),
            payment_status VARCHAR(20),
            order_status VARCHAR(50) DEFAULT 'Order Placed',
            subtotal NUMERIC(10, 2),
            shipping_fee NUMERIC(10, 2),
            total_amount NUMERIC(10, 2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);

    await db.query(`
          CREATE TABLE IF NOT EXISTS order_items (
            item_id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            size VARCHAR(10),
            unit_price NUMERIC(10, 2)
          );
        `);


    console.log("Database initialized successfully!");
  } catch (error) {
    console.log("Error Connecting to the db", error);
  }
}
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend running on Port ${PORT}`);
  });
});
