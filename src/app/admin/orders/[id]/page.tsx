"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface OrderDetail {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  createdAt: string;
  user?: { name: string; email: string; phone: string };
  address?: { fullName: string; phone: string; street: string; city: string; pincode: string };
  items: Array<{ id: string; name: string; price: number; quantity: number; size?: string; color?: string; image?: string }>;
  payment?: { id: string; status: string; amount: number; screenshot?: string; upiId: string; adminNotes?: string; createdAt: string };
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${params.id}`);
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    };
    if (params.id) fetchOrder();
  }, [params.id]);

  const updateStatus = async (status: string) => {
    const token = localStorage.getItem("hbp-token");
    await fetch(`/api/orders/${params.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    window.location.reload();
  };

  const updatePayment = async (status: string, orderStatus?: string) => {
    if (!order?.payment) return;
    const token = localStorage.getItem("hbp-token");
    await fetch(`/api/payments/${order.payment.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ status, orderStatus }),
    });
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <div className="py-20 text-center text-sm text-zinc-500">Order not found</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <Link href="/admin/orders" className="text-zinc-500 hover:text-zinc-800">
          <HiOutlineArrowLeft className="w-4 h-4" />
        </Link>
        <h2 className="text-lg font-medium">Order {order.id}</h2>
        <span className={`ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
          order.status === "delivered" ? "bg-green-100 text-green-700" :
          order.status === "shipped" ? "bg-blue-100 text-blue-700" :
          order.status === "verified" ? "bg-amber-100 text-amber-700" :
          "bg-zinc-100 text-zinc-600"
        }`}>{order.status}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-sm font-medium mb-3">Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50">
                  <div className="w-12 h-14 rounded-lg bg-zinc-200 overflow-hidden flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-zinc-500">
                      Qty: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                    </p>
                    <p className="text-xs font-medium mt-0.5">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-200 flex justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-medium">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {order.payment && (
            <div className="bg-white rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-sm font-medium mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">Status</span><span className={`font-medium capitalize ${order.payment.status === "verified" ? "text-green-600" : "text-amber-600"}`}>{order.payment.status}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Amount</span><span className="font-medium">₹{order.payment.amount}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">UPI ID</span><span className="font-mono text-xs">{order.payment.upiId}</span></div>
                {order.payment.adminNotes && <div className="flex justify-between"><span className="text-zinc-500">Notes</span><span>{order.payment.adminNotes}</span></div>}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {order.address && (
            <div className="bg-white rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-sm font-medium mb-3">Customer</h3>
              <div className="space-y-1 text-sm">
                <p>{order.address.fullName}</p>
                <p className="text-zinc-500">{order.address.phone}</p>
                <p className="text-zinc-500">{order.address.street}, {order.address.city} - {order.address.pincode}</p>
              </div>
              {order.user && (
                <div className="mt-3 pt-3 border-t border-zinc-100 text-sm">
                  <p className="text-zinc-500">{order.user.email}</p>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-2">
            <h3 className="text-sm font-medium mb-3">Actions</h3>
            {order.payment?.status === "pending" && (
              <>
                <button onClick={() => updatePayment("verified", "verified")} className="w-full py-2.5 rounded-xl bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors">
                  Approve Payment
                </button>
                <button onClick={() => updatePayment("rejected")} className="w-full py-2.5 rounded-xl bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors">
                  Reject Payment
                </button>
              </>
            )}
            {order.status === "verified" && (
              <button onClick={() => updateStatus("shipped")} className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors">
                Mark as Shipped
              </button>
            )}
            {order.status === "shipped" && (
              <button onClick={() => updateStatus("delivered")} className="w-full py-2.5 rounded-xl bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors">
                Mark as Delivered
              </button>
            )}
            {order.status === "pending" && (
              <button onClick={() => updateStatus("cancelled")} className="w-full py-2.5 rounded-xl bg-red-100 text-red-600 text-xs font-medium hover:bg-red-200 transition-colors">
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
