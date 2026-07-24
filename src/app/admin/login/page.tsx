"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("hbp-token", data.token);
      localStorage.setItem("hbp-user", JSON.stringify(data.user));
      document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`;

      if (data.user.role !== "admin") {
        throw new Error("Access denied. Admin only.");
      }

      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif">Admin Login</h1>
          <p className="text-sm text-zinc-500 mt-1">HookedByPree Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
          )}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-sm outline-none focus:border-zinc-800 transition-colors"
              placeholder="admin@hookedbypree.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-sm outline-none focus:border-zinc-800 transition-colors"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
