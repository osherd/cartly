import { Pool } from "pg";
import { Product } from "../entities/Product";
import { pgClient } from '../config/db.connection';
import { IProductRepository } from '../interfaces/product/IProductRepository';

export class ProductRepository implements IProductRepository {
  private client: Pool | undefined;

  constructor() {
    (async () => {
      this.client = await pgClient();
    })();
  }

  async create({ id, sku, name, description, sellingPrice, stockQuantity }: Product): Promise<Product> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const product = await this.client.query(
      `INSERT INTO products (id,sku, name,description,sellingPrice,stockQuantity,expirationDate) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [id, sku, name, description, sellingPrice, stockQuantity,]
    );
    return product.rows[0];
  }
  async update(id: number, stockQuantity: number): Promise<Product> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const product = await this.client.query(
      `UPDATE products SET stockQuantity=$1 WHERE id=$2 RETURNING *`,
      [stockQuantity, id]
    );
    return product.rows[0];
  }
  async findById(productId: number): Promise<Product> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const products = await this.client.query(
      `SELECT * FROM products WHERE id = $1`,
      [productId]
    );
    return products.rows[0];
  }

  async find(limit: number, offset: number): Promise<Product[]> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const products = await this.client.query(
      `SELECT * FROM products OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    return products.rows;
  }
  async delete(productId: number): Promise<void> {
    if (!this.client) {
      throw new Error("Database client is not initialized.");
    }
    const products = await this.client.query(
      `DELETE FROM products WHERE id = $1`,
      [productId]
    );
    return products.rows[0];
  }
}