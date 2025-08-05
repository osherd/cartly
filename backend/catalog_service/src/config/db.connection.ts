import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: Pool;

export const pgClient = async (): Promise<Pool> => {
  if (!client) {
    let connectionString = process.env.DATABASE_URL;
    let ssl = false;

    // Use local Docker database if specified
    if (process.env.USE_LOCAL_DB === "true") {
      connectionString = process.env.LOCAL_CONNECTION_STRING;
      ssl = false;
    }

    client = new Pool({
      connectionString,
      ssl
    });
  }

  // check if table exists

  const res = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'products'
    );
  `);
  if (res.rows[0].exists) {
    console.log("Products table already exists.");
    return client;
  }
  else {
    console.log("Creating products table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        sellingPrice FLOAT NOT NULL,
        stockQuantity INTEGER NOT NULL
      );
    `);
    console.log("Products table created successfully.");
  }

  return client;
};