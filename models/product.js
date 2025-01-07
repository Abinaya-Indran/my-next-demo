// models/product.js
import { ObjectId } from "mongodb";

export function formatProduct(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
  };
}

export function createProduct(name, price) {
  return {
    name,
    price,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
