import axios from 'axios'
import dotenv from 'dotenv';
import { Product } from '../entities/Product';
import { ICartService } from '../interfaces/cart/ICartService';
dotenv.config();


const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL

const AUTH_SERVICE_BASE_URL =
  process.env.AUTH_SERVICE_BASE_URL


export const GetProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(`${CATALOG_BASE_URL}/products/${productId}`);
    return response.data as Product
  } catch (error) {
    throw new Error("product not found");
  }
}

export const validateUser = async (token: string) => {
  console.log("ValidateUser called", token);

  try {
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });
    console.log("response", response.data);
    if (response.status !== 200) {
      throw new Error("user not authorised");
    }
    return response.data;
  } catch (error) {
    throw new Error("user not authorised");
  }
}

export const GetCart = async (userId: number, productId: string, repo: ICartService) => {

  try {

    // get user cart data
    const cart = await repo.findCartByProductId(productId, userId);

    if (!cart) {
      throw new Error("cart does not exist");
    }
    // list out all line items in the cart
    const lineItems = cart.lineItems;

    if (!lineItems.length) {
      throw new Error("cart items not found");
    }


  } catch (error) {

  }
}