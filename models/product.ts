export interface Product {
  _id?: string; // Optional because it will be generated by MongoDB
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string; // Optional field for product image
  createdAt?: Date;
  updatedAt?: Date;
}