"use client";

import { useEffect, useState } from "react";
import { categoryIcons } from "../categories/categoryIcons";
import { Briefcase, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/categories");
      const data = await res.json();

      setCategories(data.categories.slice(0, 12));
      setLoading(false);
    }

    load();
  }, []);

  function toggleCategory(cat: string) {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  return (
    <main className="flex-1 bg-[#262626] p-10 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold">Explore Your Interests</h1>
        <p className="text-gray-400 mt-3">
          Select topics you love to unlock top-rated websites tailored to your
          interests
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-28 flex items-center gap-4 rounded-xl bg-[#232323] border border-[#515151] animate-pulse"
              >
                <div className="h-6 w-6 bg-gray-700 rounded-full m-6"></div>
                <div className="h-6 w-24 bg-gray-700 rounded"></div>
              </div>
            ))
          : categories.map((cat) => {
              const Icon = categoryIcons[cat] ?? Briefcase;
              const active = selected.includes(cat);

              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`relative h-28 rounded-xl border p-6 flex items-center gap-4
                    transition
                    ${
                      active
                        ? "border-[#4A90E2] bg-[#1F2A3A]"
                        : "border-[#515151] bg-[#232323] hover:border-[#7F7F7F]"
                    }`}
                >
                  <Icon size={28} />

                  <span className="text-lg font-medium capitalize">
                    {cat.replace("-", " ")}
                  </span>

                  {active && (
                    <span className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#4A90E2] flex items-center justify-center">
                      <Check size={14} />
                    </span>
                  )}
                </button>
              );
            })}
      </div>

      <div className="flex justify-center mt-12">
        <button
          disabled={selected.length === 0}
          onClick={() =>
            router.push(`/explore/results?cats=${selected.join(",")}`)
          }
          className="px-10 py-3 rounded-xl bg-[#4A90E2] text-white
             text-lg font-medium disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
