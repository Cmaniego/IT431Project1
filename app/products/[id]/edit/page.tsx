"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { product } from "@/types/product";

interface EditproductPageProps {
  params: {
    id: string;
  };
}

export default function EditproductPage({ params }: EditproductPageProps) {
  const router = useRouter();
  // Note: On client components, we don't need to await params since they're already resolved
  
  const productId = parseInt(params.id, 10);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<product>>({
    title: "",
    author: "",
    synopsis: "",
    volumeNumber: ""
  });

  // Fetch the product data
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch any manga :(. ");
        }
        
        
      } catch (err) {
        console.error("Error fetching Manga:", err);
        setError("Failed to load Manga. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchproduct();
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Format the Volume to include "volumes"
      const dataToSubmit = {
        ...formData,
        id: productId,
        volumeNumber: formData.volumeNumber ? `Volume ${formData.volumeNumber}` : ""
      };

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Redirect to product details page after successful update
      router.push(`/products/${productId}`);
      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update the Manga. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p>Loading product information...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit product</h1>
            <Link href={`/products/${productId}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-black p-6 rounded-lg shadow">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Manga Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block font-medium">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={formData.author || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="synopsis" className="block font-medium">
                Synopsis <span className="text-red-500 ">*</span>
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                required
                value={formData.synopsis || ""}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Synopsis"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="volumeNumber" className="block font-medium">
                Volume Number
              </label>
              <input
                id="volumeNumber"
                name="volumeNumber"
                type="number"
                value={formData.volumeNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the Volume Number"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800"
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 