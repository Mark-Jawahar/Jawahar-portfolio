"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineShoppingBag, HiOutlineTruck, HiOutlineEnvelope, HiOutlineUsers } from "react-icons/hi2";

interface Analytics {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  pendingPayments: number;
  unreadMessages: number;
  totalSubscribers: number;
  recentOrders: Array<{ id: string; status: string; total: number; createdAt: string; user?: { name: string } }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("hbp-token");
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

        const [productsRes, ordersRes, messagesRes, subsRes] = await Promise.all([
          fetch("/api/products", { headers }),
          fetch("/api/orders", { headers }),
          fetch("/api/contact", { headers: { "Content-Type": "application/json" } }),
          fetch("/api/newsletter", { headers: { "Content-Type": "application/json" } }),
        ]);

        const products = await productsRes.json();
        const orders = await ordersRes.json();

        const analytics: Analytics = {
          totalProducts: Array.isArray(products) ? products.length : 0,
          totalOrders: Array.isArray(orders) ? orders.length : 0,
          totalRevenue: Array.isArray(orders) ? orders.reduce((sum: number, o: { total: number }) => sum + (o.total || 0), 0) : 0,
          pendingOrders: Array.isArray(orders) ? orders.filter((o: { status: string }) => o.status === "pending" || o.status === "verifying").length : 0,
          pendingPayments: Array.isArray(orders) ? orders.filter((o: { payment?: { status: string } }) => o.payment?.status === "pending").length : 0,
          unreadMessages: 0,
          totalSubscribers: 0,
          recentOrders: Array.isArray(orders) ? orders.slice(0, 5) : [],
        };

        setData(analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: "Total Products", value: data?.totalProducts || 0, icon: HiOutlineShoppingBag, href: "/admin/products", color: "bg-blue-50 text-blue-600" },
    { label: "Total Orders", value: data?.totalOrders || 0, icon: HiOutlineTruck, href: "/admin/orders", color: "bg-green-50 text-green-600" },
    { label: "Revenue", value: `₹${(data?.totalRevenue || 0).toLocaleString("en-IN")}`, icon: HiOutlineShoppingBag, href: "/admin/orders", color: "bg-amber-50 text-amber-600" },
    { label: "Pending Orders", value: data?.pendingOrders || 0, icon: HiOutlineShoppingBag, href: "/admin/orders?status=pending", color: "bg-red-50 text-red-600" },
    { label: "Pending Payments", value: data?.pendingPayments || 0, icon: HiOutlineShoppingBag, href: "/admin/orders", color: "bg-purple-50 text-purple-600" },
    { label: "Messages", value: data?.unreadMessages || 0, icon: HiOutlineEnvelope, href: "/admin/messages", color: "bg-teal-50 text-teal-600" },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-5">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl border border-zinc-200 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold">{card.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {data?.recentOrders && data.recentOrders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-medium mb-3">Recent Orders</h3>
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium">Order</th>
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium">Customer</th>
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium">Total</th>
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                    <td className="p-4 font-mono text-xs">{order.id}</td>
                    <td className="p-4 text-xs">{order.user?.name || "Guest"}</td>
                    <td className="p-4 text-xs">₹{order.total.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "verified" ? "bg-amber-100 text-amber-700" :
                        "bg-zinc-100 text-zinc-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
