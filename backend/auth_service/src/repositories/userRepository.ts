import { Pool } from "pg";
import { pgClient } from "../config/dbConnection";
import { IUserRepository } from '../interfaces/user/IUserRepository';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private client: Pool | undefined;

  constructor() {
    // Assign client asynchronously
    (async () => {
      this.client = await pgClient();
    })();
  }

  async create({ email, password, salt, name }: User): Promise<User> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const user = await this.client.query(
      `INSERT INTO users ( email,password,salt,name) VALUES ($1,$2,$3,$4) RETURNING *`,
      [email, password, salt, name]
    );
    return user.rows[0];
  }
  async update(userId: number, email: string): Promise<User> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const user = await this.client.query(
      `UPDATE users SET email=$1 WHERE id=$2 RETURNING *`,
      [email, userId]
    );
    return user.rows[0];
  }
  async findByEmail(email: string): Promise<User> {

    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const user = await this.client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return user.rows[0];
  }

  async find(limit: number, offset: number): Promise<User[]> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const users = await this.client.query(
      `SELECT * FROM users OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    return users.rows;
  }
  async delete(userId: string): Promise<User> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const user = await this.client.query(
      `DELETE FROM users WHERE id = $1`,
      [userId]
    );
    return user.rows[0];
  }
}
