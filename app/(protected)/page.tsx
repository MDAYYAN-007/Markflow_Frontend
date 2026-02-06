"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductSkeleton from "../components/ProductSkeleton";
import { BiSort } from "react-icons/bi";
import { Pencil, Share2, Trash2 } from "lucide-react";
import { Filter } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const productsPerPage = 28;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage,
  );

  useEffect(() => {
    async function loadProducts() {
      setErrorMessage("");
      setLoadingProducts(true);

      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.products);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setErrorMessage(
          error.message || "Something went wrong while loading products.",
        );
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className={`flex-1 `}>
      <div className="bg-[#262626] p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Home</h2>
            <p className="text-gray-400 mt-1">Effortless Bookmark Management</p>
          </div>
          <div className="flex gap-3">
            <button className="bg[#262626] border-[0.3px] border-[#616161] py-2 px-4 rounded-xl cursor-pointer hover:bg-[#2A2A2A] transition">
              <BiSort size={18} className="inline-block mr-2" />
              Sort
            </button>
            <button className="bg[#262626] border-[0.3px] border-[#616161] py-2 px-4 rounded-xl cursor-pointer hover:bg-[#2A2A2A] transition">
              <Filter size={18} className="inline-block mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {loadingProducts ? (
            <ProductSkeleton />
          ) : products.length > 0 ? (
            paginatedProducts.map((product: any) => (
              <div key={product.id} className="w-70 h-57">
                <div
                  className="relative overflow-hidden
                    h-52.5 bg-[#232323] border border-[#515151] rounded-[10px] p-4 flex flex-col justify-between
                    transition-all duration-200 hover:h-57 hover:shadow-[2px_4px_10.8px_rgba(0,0,0,0.5)] group"
                >
                  <div
                    className="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  />

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold leading-tight">
                        {product.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-400 leading-snug line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="h-10 w-10 min-w-10 rounded-md bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-300">
                          {product.title.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={
                            i <= Math.round(product.rating) ? "#FACC15" : "none"
                          }
                          stroke="#FACC15"
                          strokeWidth="2"
                        >
                          <path d="M12 17.3l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.76-1.64 7.03z" />
                        </svg>
                      ))}
                    </div>

                    <span className="px-3 py-1 rounded-md bg-[#1A1A1A] text-sm text-gray-300 capitalize">
                      {product.category}
                    </span>
                  </div>

                  <div className="mt-3 hidden group-hover:flex gap-2">
                    <button className="flex-1 bg-white text-black rounded-md py-2 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                      <Pencil size={14} />
                    </button>
                    <button className="flex-1 bg-white text-black rounded-md py-2 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                      <Share2 size={14} />
                    </button>
                    <button className="flex-1 bg-white text-black rounded-md py-2 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 flex flex-col items-center justify-center py-20 text-center text-gray-400 min-h-[68.8vh]">
              <p className="text-lg font-medium">No bookmarks available</p>
              <p className="text-sm mt-1">Start adding bookmarks</p>

              <Link
                href="/add-bookmark"
                className="mt-5 inline-block bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                Add your first bookmark
              </Link>

              {errorMessage && (
                <p className="text-sm mt-4 text-red-500">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
        {!loadingProducts && products.length > productsPerPage && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-[#515151]
                 bg-[#1B1B1B] text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-800 transition"
            >
              Prev
            </button>

            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-[#515151]
                 bg-[#1B1B1B] text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
