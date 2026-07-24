"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const token = localStorage.getItem("hbp-token");
      const res = await fetch("/api/newsletter", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubscribers(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchSubscribers();
  }, []);

  const exportCSV = () => {
    const csv = "Email,Date\n" + subscribers.map((s) => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-medium">Subscribers ({subscribers.length})</h2>
        {subscribers.length > 0 && (
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
          >
            Export CSV
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Email</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Subscribed On</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                <td className="p-4 text-xs">{sub.email}</td>
                <td className="p-4 text-xs text-zinc-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-xs text-zinc-400">No subscribers yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
