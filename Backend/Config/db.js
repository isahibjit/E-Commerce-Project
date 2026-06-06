import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const hasDatabaseConfig = [
  process.env.PG_USER,
  process.env.PG_HOST,
  process.env.PG_DATABASE,
  process.env.PG_PASSWORD,
  process.env.PG_PORT,
].every(Boolean);

const shouldUseSsl =
  process.env.PG_SSL === "true" ||
  (process.env.PG_HOST &&
    !["localhost", "127.0.0.1"].includes(process.env.PG_HOST.toLowerCase()));

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: shouldUseSsl
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

async function initDb() {
  const client = await db.connect();
  try {
    await client.query("SET search_path TO public;");
    await client.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT);");
    await client.query(`
      CREATE TABLE IF NOT EXISTS session (
        sid VARCHAR PRIMARY KEY,
        sess JSONB NOT NULL,
        expire TIMESTAMP WITHOUT TIME ZONE NOT NULL
      );
    `);
  } catch (err) {
    console.error("Error during DB initialization:", err);
  } finally {
    client.release();
  }
}

if (hasDatabaseConfig) {
  initDb().catch((err) => console.error("Error connecting to the database:", err));
}

export default db;
