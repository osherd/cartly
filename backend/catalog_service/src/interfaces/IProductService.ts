import { Product } from '../entities/Product';

export interface IProductService {

  createProduct(input: Product): Promise<Product>;
  getProduct(limit: number, offset: number): Promise<Product[]>;

  getProductById(productId: number): Promise<Product>;
  deleteProductById(productId: number): Promise<void>;

}

// createProduct(input: Product): Promise<Product>;
// getProduct(limit: number, offset: number): Promise<Product>;
// getProductById(productId: string): Promise<Product>;
// deleteProductById(productId: string): Promise<void>;
// }
