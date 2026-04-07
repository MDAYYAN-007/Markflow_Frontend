"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Share2, Trash2 } from "lucide-react";
import CategorySkeleton2 from "../../../components/CategorySkeleton2";

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params?.category as string;
  const category = decodeURIComponent(categoryParam);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) return;

    async function loadCategory() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/category?name=${category}`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load category");
        }

        setProducts(data.products);
      } catch (err: any) {
        console.error("Client category error:", err);
        setProducts([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [category]);

  return (
    <main className="flex-1 bg-[#262626] p-8">
      <div className="mb-6">
        <Link
          href="/categories"
          className="text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft size={14} className="inline-block mr-1" />
          Back to Categories
        </Link>

        <h1 className="text-3xl font-semibold mt-2 capitalize">
          {category.replace("-", " ")}
        </h1>
        <p className="text-gray-400 mt-1">Bookmarks under this category</p>
      </div>

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CategorySkeleton2 key={i} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400">
          <p className="text-lg font-medium">No bookmarks in this category</p>

          {error && <p className="text-sm mt-2 text-red-500">{error}</p>}

          <Link
            href="/add-bookmark"
            className="mt-6 bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Add bookmark
          </Link>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-[#232323] border border-[#515151]
                         px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-[#1A1A1A] flex items-center justify-center">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {product.title.charAt(0)}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200">
                  <Pencil size={14} />
                </button>
                <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200">
                  <Share2 size={14} />
                </button>
                <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
