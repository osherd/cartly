import { Cart } from '../entities/Cart';
import { ICartRepository } from '../interfaces/cart/ICartRepository';
import { ICartService } from '../interfaces/cart/ICartService';

export class CartService implements ICartService {
  private repo: ICartRepository;
  constructor(repo: ICartRepository) {
    this.repo = repo

  }
  async findCartByProductId(productId: string, userId: number): Promise<Cart> {
    return this.findCart(userId, productId)
  }
  async createCart(input: Cart): Promise<Cart> {
    return this.repo.create(input);
  }
  async findCarts(limit: number, offset: number): Promise<Cart[]> {
    return this.repo.find(limit, offset);
  }
  async findCart(userId: number, productId: string): Promise<Cart> {
    return this.repo.findOne(userId, productId)
  }
  async updateCart(id: number, payload: Cart): Promise<Cart> {
    return this.repo.update(id, payload);
  }
  async delete(id: number): Promise<void> {
    return this.delete(id)
  }
}