import { Product } from '../entities/Product';

export interface IProductRepository {

  create(data: Product): Promise<Product>;
  update(id: number, stock: number): Promise<Product>;
  find(limit: number, offset: number): Promise<Product[]>;
  findById(productId: number): Promise<Product>;
  delete(productId: number): Promise<void>;
}