import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { product } from "@/types/product";

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "products.json");

// Helper function to read products
const readProducts = (): product[] => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(jsonData) as product[];
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
};

// Helper function to write products
const writeproducts = (products: product[]) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to products file:", error);
  }
};

// GET: Retrieve a product by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id } = await context.params; // Await params before accessing
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    const products = readProducts();
    const product = products.find((c) => c.id === productId);

    if (!product) {
      return NextResponse.json({ error: "product not found." }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return NextResponse.json(
      { error: "Failed to retrieve product." },
      { status: 500 }
    );
  }
}

// PUT: Update a product by ID
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id } = await context.params; // Await params before accessing
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    const updatedproduct: Partial<product> = await request.json();
    const products = readProducts();
    const index = products.findIndex((c) => c.id === productId);

    if (index === -1) {
      return NextResponse.json({ error: "Manga not found." }, { status: 404 });
    }

    products[index] = { ...products[index], ...updatedproduct, id: productId };

    writeproducts(products);

    return NextResponse.json(products[index], { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a product by ID
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id } = await context.params; // Await params before accessing
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    let products = readProducts();
    const initialLength = products.length;
    products = products.filter((c) => c.id !== productId);

    if (products.length === initialLength) {
      return NextResponse.json({ error: "product not found." }, { status: 404 });
    }

    writeproducts(products);

    return NextResponse.json(
      { message: `product with ID ${productId} deleted.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
