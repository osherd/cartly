import { Pool } from 'pg';
import { pgClient } from '../config/db.connection';
import { ICartRepository } from '../interfaces/cart/ICartRepository';
import { Cart } from '../entities/Cart';

export class CartRepository implements ICartRepository {

  private client: Pool | undefined;

  constructor() {
    (async () => {
      this.client = await pgClient();
    })();
  }
  async create(cartData: Cart): Promise<Cart> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    return cartData;
  }
  async find(limit: number, offset: number): Promise<Cart[]> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    throw new Error('Method not implemented.');
  }
  async findOne(id: number): Promise<Cart> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    throw new Error('Method not implemented.');
  }
  async update(id: number, payload: Cart): Promise<Cart> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    throw new Error('Method not implemented.');
  }
  async delete(id: number): Promise<void> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
      throw new Error('Method not implemented.');
  }

}