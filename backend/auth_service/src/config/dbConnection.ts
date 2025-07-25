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

  // Create users table if it doesn't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      salt VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Users table created successfully.");

  return client;
};