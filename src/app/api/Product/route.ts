// src/app/api/Product/route.ts
import { connectToDatabase } from "../../../../lib/db";
import Product from "../../../../models/product";
import { ObjectId } from "mongodb";

// GET: Fetch all products
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection("products").find({}).toArray();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await req.json();
    const { name, price } = body;

    if (!name || !price) {
      return new Response(JSON.stringify({ error: "Name and price are required" }), {
        status: 400,
      });
    }

    const newProduct = { name, price, createdAt: new Date(), updatedAt: new Date() };
    const result = await db.collection("products").insertOne(newProduct);

    // return new Response(JSON.stringify(result.ops[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
    });
  }
}

// PATCH: Update a product by ID
export async function PATCH(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await req.json();
    const { id, name, price } = body;

    if (!id || (!name && !price)) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        status: 400,
      });
    }

    const updateFields: any = { updatedAt: new Date() };
    if (name) updateFields.name = name;
    if (price) updateFields.price = price;

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Product updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      status: 500,
    });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
      });
    }

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Product deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete product" }), {
      status: 500,
    });
  }
}
