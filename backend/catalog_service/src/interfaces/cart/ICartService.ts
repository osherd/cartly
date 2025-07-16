import { Cart } from '../../entities/Cart';

export interface ICartService {
  createCart(input: Cart): Promise<Cart>;
  findCarts(limit: number, offset: number): Promise<Cart[]>;
  findCart(userId: number, productId: string): Promise<Cart>;
  findCartByProductId(productId: string, userId: number): Promise<Cart>
  updateCart(id: number, payload: Cart): Promise<Cart>;
  delete(id: number): Promise<void>;
}