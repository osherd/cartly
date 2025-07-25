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
  async update(id: number, name: string): Promise<User> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }

    const result = await this.client.query(
      `UPDATE users SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );

    if (result.rowCount === 0) {
      throw new Error(`User with id ${id} not found.`);
    }

    return result.rows[0];
  }

  async create({ email, password, salt, name, roles }: User): Promise<User> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    try {
      const user = await this.client.query(
        `INSERT INTO users ( email,password,salt,name,roles) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [email, password, salt, name, roles]
      );
      return user.rows[0];
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);

    }
  }
  // change password
  async changePassword(email: string, newPassword: string, salt: string): Promise<User> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const user = await this.client.query(
      `UPDATE users SET password=$1, salt=$2 WHERE email=$3 RETURNING *`,
      [newPassword, salt, email]
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
