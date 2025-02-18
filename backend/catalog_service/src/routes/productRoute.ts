import express from "express";
import { ProductRepository } from '../repositories/productRepository'
import { ProductService } from '../services/product.service';
import { ProductController } from '../controllers/productController';

const router = express.Router();
const repository = new ProductRepository()
const interactor = new ProductService(repository)
const controller = new ProductController(interactor);


router.post('/v1/products', controller.onCreateProduct.bind(controller));
// router.get('/v1/products', controller.onGetProducts.bind(controller));
// router.get('/v1/products/:id', controller.onGetProductById.bind(controller));
// router.get('/v1/products/:id', controller.onDeleteProductById.bind(controller));

export default router;