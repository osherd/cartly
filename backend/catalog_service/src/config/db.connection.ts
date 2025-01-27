import { Pool } from 'pg';


let client: Pool;

export const pgClient = () => {

  if (!client) {
    client = new Pool({
      connectionString: process.env.CATALOG_DATABASE_URL,
      ssl: false
    })
  }
  return client;

}