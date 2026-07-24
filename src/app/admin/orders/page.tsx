"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineEye } from "react-icons/hi2";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user?: { name: string; email: string };
  payment?: { status: string };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("hbp-token");
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter || o.payment?.status === filter);

  const statusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-zinc-100 text-zinc-600",
      verified: "bg-amber-100 text-amber-700",
      shipped: "bg-blue-100 text-blue-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-600",
    };
    return colors[status] || "bg-zinc-100 text-zinc-600";
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
      <h2 className="text-lg font-medium mb-5">Orders ({orders.length})</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "pending", "verified", "shipped", "delivered"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Order ID</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Customer</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Total</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Payment</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Status</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Date</th>
              <th className="text-right p-4 text-xs text-zinc-500 font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                <td className="p-4 font-mono text-xs">{order.id}</td>
                <td className="p-4 text-xs">{order.user?.name || "Guest"}</td>
                <td className="p-4 text-xs">₹{order.total.toLocaleString("en-IN")}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor(order.payment?.status || "pending")}`}>
                    {order.payment?.status || "pending"}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900"
                  >
                    <HiOutlineEye className="w-3.5 h-3.5" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
