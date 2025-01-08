// src/app/api/Product/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Product from "../../../../models/product";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find()
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newProduct = new Product(body);
    await newProduct.save();

    return NextResponse.json(Product, {status:200});

  } catch (error:any) {
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
    });
  }
}

// PATCH: Update a product by ID
export const PATCH = async (req: Request) => {
  try {
    const body = await req.json(); // Parse the request body
    const { ProductId, newProductName } = body; // Extract the fields

    await connectToDatabase(); // Connect to the database

    // Validate input
    if (!ProductId || !newProductName) {
      return new Response(
        JSON.stringify({ message: "ProductId and newProductName are required" }),
        { status: 400 }
      );
    }

    // Update the product
    const updateProduct = await Product.findByIdAndUpdate(
      ProductId, // Use ProductId to find the product
      { name: newProductName }, // Update the product's name
      { new: true } // Return the updated document
    );

    // Check if the product exists
    if (!updateProduct) {
      return new Response(
        JSON.stringify({ message: "Product not found in DB" }),
        { status: 404 }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "Product updated", product: updateProduct }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({ message: "Error updating product", error: error.message }),
      { status: 500 }
    );
  }
};


export async function DELETE(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the JSON body
    const body = await req.json();
    const { ProductID } = body;

    // Validate ProductID
    if (!ProductID) {
      return new Response(
        JSON.stringify({ error: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Attempt to delete the product by ID
    const result = await Product.findByIdAndDelete(ProductID);

    // Check if the product was found and deleted
    if (!result) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Return failure response with error details
    return new Response(
      JSON.stringify({ error: "Failed to delete product", details: error.message }),
      { status: 500 }
    );
  }
}

