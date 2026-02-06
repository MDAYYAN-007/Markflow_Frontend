"use client";

import { useEffect, useState } from "react";
import { Search, Pencil } from "lucide-react";

const page = () => {
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch {
        console.error("Failed to load categories");
      }
    }

    fetchCategories();
  }, []);

  return (
    <main className="flex-1">
      <div className="p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold">Add New Bookmark</h1>
          <p className="mt-2 text-[#9B9B9B]">
            Save a new bookmark to your collection
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <label className="block mb-2 text-sm">
                URL <span className="text-[#F1C40F]">*</span>
              </label>

              <div className="flex gap-3">
                <input
                  placeholder="http://example.com"
                  className="flex-1 rounded-lg bg-[#1B1B1B] border border-[#515151]
                               px-4 py-3 text-sm placeholder-[#7F7F7F]
                               focus:outline-none focus:border-[#4A90E2]"
                />

                <button
                  className="flex items-center gap-2 rounded-lg bg-[#4A90E2]
                               px-5 py-3 text-sm font-medium
                               hover:opacity-90 transition cursor-pointer"
                >
                  <Search size={16} />
                  Fetch Website Data
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Name</label>

              <div className="relative">
                <input
                  placeholder="Figma"
                  className="w-full rounded-lg bg-[#1B1B1B] border border-[#515151]
                               px-4 py-3 pr-10 text-sm placeholder-[#7F7F7F]
                               focus:outline-none focus:border-[#4A90E2]"
                />
                <Pencil
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                               text-[#9B9B9B]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Description</label>

              <div className="relative">
                <input
                  placeholder="Cloud-based UI/UX design tool."
                  className="w-full rounded-lg bg-[#1B1B1B] border border-[#515151]
                               px-4 py-3 pr-10 text-sm placeholder-[#7F7F7F]
                               focus:outline-none focus:border-[#4A90E2]"
                />
                <Pencil
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                               text-[#9B9B9B]"
                />
              </div>
            </div>

            <div className="flex items-start gap-10">
              <div>
                <label className="block mb-2 text-sm">Logo</label>
                <div
                  className="h-20 w-20 rounded-lg bg-[#1B1B1B] border border-[#515151]
                               flex items-center justify-center"
                >
                  <span className="text-[#9B9B9B] text-sm">Logo</span>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Bookmark Rating</label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      className="cursor-pointer"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill={i <= rating ? "#F1C40F" : "none"}
                        stroke="#F1C40F"
                        strokeWidth="2"
                      >
                        <path
                          d="M12 17.3l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2
                   9.19 8.63 2 9.24l5.46 4.76-1.64 7.03z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg bg-[#1B1B1B] border border-[#515151] px-4 py-3 text-sm text-[#FDFDFD] focus:outline-none focus:border-[#4A90E2]"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[#F7F7F7] text-black py-4 text-base font-medium hover:bg-[#F4F4F4] transition cursor-pointer">
              Save Bookmark
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
