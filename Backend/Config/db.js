import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDb() {
  const client = await db.connect(); 
  try {
    // Set the schema explicitly after connecting
    await client.query('SET search_path TO public;');
    
    // Your other queries go here, for example:
    await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT);'); 
  } catch (err) {
    console.error('Error during DB initialization:', err);
  } finally {
    client.release(); // Release the client
  }
}

initDb().catch(err => console.error('Error connecting to the database:', err));

export default db;
