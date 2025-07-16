import { Pool } from 'pg';
import { pgClient } from '../config/db.connection';
import { ICartRepository } from '../interfaces/cart/ICartRepository';
import { Cart } from '../entities/Cart';

export class CartRepository implements ICartRepository {

  private client: Pool;

  constructor() {
    this.client = pgClient()
  }
  async create(cartData: Cart): Promise<Cart> {
    return cartData;
  }
  async find(limit: number, offset: number): Promise<Cart[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: number): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  async update(id: number, payload: Cart): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

}