"use client";

import { useEffect, useState } from "react";
import { Upload, Trash2, LogOut } from "lucide-react";

export default function SettingsPage() {
  const [autoFetch, setAutoFetch] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [rating, setRating] = useState(0);

  const [categories, setCategories] = useState<string[]>([]);
  const [defaultCategory, setDefaultCategory] = useState("uncategorized");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("https://dummyjson.com/products/category-list");
        const data = await res.json();
        setCategories(data);
      } catch (e) {
        console.error("Failed to load categories");
      }
    }

    loadCategories();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <main className="flex-1 bg-[#262626] p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your app preferences</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        <section className="rounded-xl bg-[#232323] border border-[#515151] p-6">
          <h2 className="text-lg font-semibold mb-6">General Settings</h2>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-300 mb-3">Default category</p>

              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => {
                  const active = defaultCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setDefaultCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize cursor-pointer
                        border transition
                        ${
                          active
                            ? "bg-[#4A90E2] border-[#4A90E2] text-white"
                            : "bg-[#1B1B1B] border-[#515151] hover:border-[#7F7F7F]"
                        }`}
                    >
                      {cat.replace("-", " ")}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">
                Auto-fetch website data
              </span>
              <button
                onClick={() => setAutoFetch(!autoFetch)}
                className={`w-11 h-6 rounded-full relative transition
                  ${autoFetch ? "bg-[#4A90E2]" : "bg-[#515151]"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition
                    ${autoFetch ? "right-0.5" : "left-0.5"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Default rating</span>
              <div className="flex gap-1 text-yellow-400 cursor-pointer">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    onClick={() => setRating(i)}
                    className="text-lg"
                  >
                    {i <= rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-[#232323] border border-[#515151] p-6">
          <h2 className="text-lg font-semibold mb-6">Appearance</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 rounded-full relative transition
                  ${darkMode ? "bg-[#4A90E2]" : "bg-[#515151]"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition
                    ${darkMode ? "right-0.5" : "left-0.5"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Language</span>
              <select className="bg-[#1B1B1B] border border-[#515151] rounded-lg px-4 py-2 text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-[#232323] border border-[#515151] p-6">
          <h2 className="text-lg font-semibold mb-6">Bookmark Management</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Export bookmarks</span>
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
                Export data
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Import bookmarks</span>
              <div className="flex gap-3 items-center">
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Upload size={14} />
                  Import
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Clear all bookmarks</span>
              <button className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
                <Trash2 size={14} />
                Clear all
              </button>
            </div>
          </div>
        </section>

        <section className="flex justify-end pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-10 py-3 rounded-xl
                       bg-[#1B1B1B] border border-[#515151]
                       hover:bg-red-700 hover:text-white cursor-pointer transition text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </section>
      </div>
    </main>
  );
}
