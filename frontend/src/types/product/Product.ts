
import { User } from '../user/User';

export type Product = {
  user: User,
  name: string,
  sku: string,
  category: string,
  quantity: string,
  price: string,
  description: string,
  image: object,
  createdAt: string,
  updatedAt: string,
  _id: string
}