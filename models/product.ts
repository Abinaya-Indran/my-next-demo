import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true }, // Fixed "reqiured" to "required"
  price: { type: Number, required: true }, // Fixed "Price" to "price" (standard naming convention)
  description: { type: String, required: false }, // Optional field for description
  category: { type: String, required: false }, // Optional category
  stock: { type: Number, required: false, default: 0 }, // Optional stock with default value
  createdAt: { type: Date, default: Date.now }, // Automatic timestamp for creation
});

// Export the model (check if it already exists in `models`)
const Product = models.Product || model("Product", productSchema);

export default Product;
