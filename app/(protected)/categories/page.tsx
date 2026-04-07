"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Folder, Briefcase } from "lucide-react";
import { categoryIcons } from "./categoryIcons";
import AddCategoryModal from "../../components/AddCategoriesModal";
import CategorySkeleton from "../../components/CategorySkeleton";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/categories");
      const data = await res.json();

      setCategories(data.categories);
      setCategoryCounts(data.categoryCounts);
      setTotal(data.totalProducts);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <main className="flex-1 bg-[#262626] p-8 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Categories</h1>
          <p className="text-gray-400 mt-1">
            Organize your bookmarks by category
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-white text-black px-5 py-3 font-medium cursor-pointer hover:bg-gray-200 transition"
        >
          Add new +
        </button>
      </div>

      {loading ? (
        <CategorySkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/categories/all">
            <div
              className="h-30 rounded-xl bg-[#232323] border border-[#515151]
                p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">All</h3>
                <Folder size={28} />
              </div>
              <span className="text-sm bg-black/40 px-3 py-1 rounded-md w-fit">
                {total} bookmarks
              </span>
            </div>
          </Link>

          {categories.map((cat) => {
            const Icon = categoryIcons[cat] ?? Briefcase;

            return (
              <Link key={cat} href={`/categories/${cat}`}>
                <div
                  className="h-30 rounded-xl bg-[#232323]
                    border border-[#515151]
                    p-6 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium capitalize">
                      {cat.replace("-", " ")}
                    </h3>
                    <Icon size={28} />
                  </div>
                  <span className="text-sm bg-black/40 px-3 py-1 rounded-md w-fit">
                    {categoryCounts[cat] ?? 0} Bookmarks
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <AddCategoryModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
