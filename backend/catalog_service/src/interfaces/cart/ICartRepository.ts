import { Cart } from '../../entities/Cart';

export interface ICartRepository {
  create(cartData: Cart): Promise<Cart>;
  find(limit: number, offset: number): Promise<Cart[]>;
  findOne(userId: number, productId: string): Promise<Cart>;
  update(id: number, payload: Cart): Promise<Cart>;
  delete(id: number): Promise<void>
}