"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

type User = {
  name: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setTimeout(() => setCheckingSession(false), 500);
      }
    }

    checkSession();
  }, []);

  async function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      const meRes = await fetch("/api/session");
      const meData = await meRes.json();
      setUser(meData.user);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-[#0B0F19] via-70% to-[#4A90E2] flex items-center justify-center text-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-[#0B0F19] via-70% to-[#4A90E2] flex items-center justify-center text-white">
      <div className="w-full max-w-7xl flex items-center justify-between px-20">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold tracking-tight">Markflow</h1>
          <p className="mt-6 text-3xl font-semibold text-gray-200">
            The ultimate <br /> bookmark manager.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Organize, save and access your bookmarks effortlessly.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="relative rounded-2xl bg-linear-to-b from-[#161616] to-[#0D0D0D] p-8 border border-gray-800">
            {user ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">You’re logged in</h2>

                <p className="text-gray-400">
                  Logged in as{" "}
                  <span className="text-white font-medium">{user.name}</span>
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/")}
                    className="flex-1 rounded-lg bg-indigo-600 py-2.5 font-medium
                    cursor-pointer hover:bg-indigo-500"
                  >
                    Go to Home
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex-1 rounded-lg border border-red-500/40 text-red-400
                    cursor-pointer hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">Login</h2>
                <p className="text-gray-400 mt-1">Enter your credentials</p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="kminchelle"
                      className="w-full rounded-lg bg-black/70 border border-gray-700 px-4 py-3 text-sm
                      focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="0lelplR"
                        className="w-full rounded-lg bg-black/70 border border-gray-700 px-4 py-3 pr-12 text-sm
                        focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 cursor-pointer"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-indigo-600 py-3 font-medium
                    cursor-pointer hover:bg-indigo-500 disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>

                  {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
