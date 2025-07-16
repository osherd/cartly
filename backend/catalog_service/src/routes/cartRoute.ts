import express from 'express';
import { CartRepository } from '../repositories/cartRepository';
import { CartService } from '../services';
import { CartController } from '../controllers/cartController';


const router = express.Router();

const cartInteractor = new CartRepository();
const cartService = new CartService(cartInteractor);
const cartController = new CartController(cartService);

router.post('/v1/carts', cartController.onCartCreate.bind(cartController))


export default router