import { Request, Response } from 'express';
import { ICartService } from '../interfaces/cart/ICartService';
import { GetProductDetails } from '../utils/api';

export class CartController {
  private cartService: ICartService;
  constructor(cartService: ICartService) {
    this.cartService = cartService;
  }
  async onCartCreate(req: Request, res: Response): Promise<any> {

    try {

      // check if user logged in
      if (!req.body.userId) {
        return res.status(400).json({ error: 'User not logged in' });
      }
      if (!req.body.productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
      // get product details from catalog service

      const product = await GetProductDetails(req.body.productId)
      console.log(product);

      //find if the product is already in cart
      const lineItem = await this.cartService.findCartByProductId(req.body.productId, req.body.userId);

      if (lineItem) {
        this.cartService.updateCart(req.body.userId, {
          userId: req.body.userId,
          productId: req.body.productId,
          productName: product.name,
          stockQuantity: product.stockQuantity,
          sellingPrice: product.sellingPrice,
          id: product.id.toString(),
          lineItems: undefined,
        });

        const cart = await this.cartService.createCart(req.body);
        res.status(200).json(cart);
      }
    } catch (error) {
      throw new Error('some Error')
    }
  }
}