"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

type User = {
  name: string;
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();

        if (!data?.user) {
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setTimeout(() => setCheckingSession(false), 200);
      }
    }

    checkSession();
  }, []);

  return (
    <div className="min-h-screen flex text-white">
      <Sidebar />

      <main className="flex-1 bg-[#262626]">
        {checkingSession && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!checkingSession && !user && (
          <div className="w-full h-full flex items-center justify-center text-center">
            <div>
              <h2 className="text-3xl font-semibold">Welcome to Markflow</h2>
              <p className="mt-2 text-gray-400">
                Save, organize and access your bookmarks effortlessly.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200"
              >
                Login to continue
              </button>
            </div>
          </div>
        )}

        {!checkingSession && user && (
          <>
            <SearchBar />
            <div className="w-full">{children}</div>
          </>
        )}
      </main>
    </div>
  );
}
