"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function AddproductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    synopsis: "",
    volumeNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the volumeNumber to include "Number"
      const dataToSubmit = {
        ...formData,
        volumeNumber: formData.volumeNumber ? `Volume ${formData.volumeNumber}` : undefined
      };

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      const response = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      // Redirect to home page after successful creation
      router.push("/");
      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add New Manga</h1>
            <Link href="/">
              <Button variant="outline">Back to other All Manga</Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-black p-6 rounded-lg shadow">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block font-medium">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the name of the author"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="synopsis" className="block font-medium">
                Synopsis <span className="text-red-500">*</span>
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                required
                value={formData.synopsis}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product synopsis"
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
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
                disabled={loading}
              >
                {loading ? "Adding product..." : "Add product"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 