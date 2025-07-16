import { Product } from '../entities/Product';
import { IProductRepository } from '../interfaces/product/IProductRepository';
import { IProductService } from '../interfaces/product/IProductService';

export class ProductService implements IProductService {
  private repo: IProductRepository;
  constructor(repo: IProductRepository) {
    this.repo = repo
  }
  async createProduct(input: Product): Promise<Product> {
    return this.repo.create(input)
  }
  async getProduct(limit: number, offset: number): Promise<Product[]> {
    return this.repo.find(limit, offset)
  }
  async getProductById(productId: number): Promise<Product> {
    return this.repo.findById(productId)
  }
  async deleteProductById(productId: number): Promise<void> {
    return this.repo.delete(productId)
  }


}