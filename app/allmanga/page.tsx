import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductCard from "@/components/productCard";

interface product {
  id: number;
  title: string;
  author: string;
  synopsis: string;
  volumeNumber: string;
}

// This is a Server Component that fetches data
async function getproducts(): Promise<product[]> {
  try {
    // Use relative URL for API routes in the same Next.js app
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store", // Disable caching for this request
    });
    
    if (!res.ok) {
      console.error('API response error:', await res.text());
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on error to prevent UI from breaking
  }
}

const AllManga: FC = async () => {
  const products = await getproducts();
  
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Manga List</h1>
          <Link href="/products/add">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-yellow-600 hover:to-yellow-800">
              Add New product
            </Button>
          </Link>
        </div>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product ={ product } />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllManga;
