"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Bookmark, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ExploreResultsPage() {
  const searchParams = useSearchParams();
  const selectedCats = searchParams.get("cats")?.split(",") ?? [];

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch("https://dummyjson.com/products?limit=0");
      const data = await res.json();

      const filtered = data.products.filter((p: any) =>
        selectedCats.includes(p.category),
      );

      setProducts(filtered.slice(0, 12));
      setLoading(false);
    }

    load();
  }, []);

  return (
    <main className="flex-1 bg-[#262626] p-8 min-h-screen">
      <div className="mb-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-gray-400
               hover:text-white mb-2"
        >
          <ArrowLeft size={14} />
          Back to Explore
        </Link>

        <h1 className="text-3xl font-semibold">Explore</h1>
        <p className="text-gray-400 mt-1">
          Curated websites based on your interests
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {selectedCats.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 rounded-xl border border-[#515151]
                       bg-[#1B1B1B] text-sm capitalize"
          >
            {cat.replace("-", " ")}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-[#232323]
                           border border-[#515151] animate-pulse"
              />
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl bg-[#232323]
                           border border-[#515151]
                           p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{product.title}</h3>

                    <div
                      className="h-10 w-10 rounded-md bg-[#1A1A1A]
                                    flex items-center justify-center"
                    >
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <span className="font-semibold">
                          {product.title.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="flex gap-1 text-yellow-400 text-sm mt-4">
                  {"★★★★★"}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="px-3 py-1 rounded-md text-xs bg-black/40 capitalize">
                    {product.category.replace("-", " ")}
                  </span>

                  <div className="flex gap-3">
                    <button className="text-gray-400 hover:text-white">
                      <Bookmark size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <Heart size={16} />
                    </button>
                    <a
                      href="#"
                      target="_blank"
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && products.length === 0 && (
        <div className="h-[50vh] flex items-center justify-center text-gray-400">
          No results for selected interests
        </div>
      )}
    </main>
  );
}
