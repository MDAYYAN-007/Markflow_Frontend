"use client";

import { useEffect, useState } from "react";
import { Pencil, Share2, Trash2, ExternalLink } from "lucide-react";
import CategorySkeleton2 from "../../components/CategorySkeleton2";

export default function FrequentPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/frequent");
        const data = await res.json();

        setProducts(data.products ?? []);
      } catch (e) {
        console.error("Frequent fetch error", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main className="flex-1 bg-[#262626] p-8 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Frequent</h1>
          <p className="text-gray-400 mt-1">
            Your most visited bookmarks, always at hand.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-lg bg-[#1B1B1B] border border-[#515151] px-4 py-2">
            Sort
          </button>
          <button className="rounded-lg bg-[#1B1B1B] border border-[#515151] px-4 py-2">
            List
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <CategorySkeleton2 key={i} />
          ))}

        {!loading && products.length === 0 && (
          <div className="h-[50vh] flex flex-col items-center justify-center text-gray-400">
            <p className="text-lg font-medium">No frequent bookmarks yet</p>
            <p className="text-sm mt-1">
              Start visiting bookmarks to see them here
            </p>
          </div>
        )}

        {!loading &&
          products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-[#232323] border border-[#515151] px-6 py-4"
            >
              <div className="grid grid-cols-10 gap-6 items-center">
                <div className="col-span-6 flex items-start gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-md bg-[#1A1A1A] flex items-center justify-center overflow-hidden shrink-0">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-semibold">
                        {product.title?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold truncate">
                        {product.title}
                      </h3>

                      <div className="flex gap-1 text-yellow-400 text-sm shrink-0">
                        ★★★★★
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                      {product.description}
                    </p>

                    <span className="inline-block mt-2 px-3 py-1 rounded-md text-xs bg-black/40">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="col-span-4 flex items-center justify-end gap-2">
                  <a
                    href={product.url || "#"}
                    target="_blank"
                    className="px-4 py-2 rounded-md bg-[#4A90E2] text-white flex items-center gap-2 shrink-0"
                  >
                    Visit website
                    <ExternalLink size={14} />
                  </a>

                  <button className="h-9 w-9 rounded-md bg-white text-black flex items-center justify-center shrink-0">
                    <Pencil size={14} />
                  </button>
                  <button className="h-9 w-9 rounded-md bg-white text-black flex items-center justify-center shrink-0">
                    <Share2 size={14} />
                  </button>
                  <button className="h-9 w-9 rounded-md bg-white text-black flex items-center justify-center shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
