"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", tagline: "", description: "", price: "", comparePrice: "",
    category: "apparel", collection: "The Apparel Collection",
    sizes: "", colors: "", materials: "", deliveryEstimate: "5-7",
    isBestSeller: false, isNew: false, isCustomizable: false, isGiftReady: false, isPremiumPackaging: false,
    occasions: "", inStock: true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("hbp-token");
    const body = {
      ...form,
      price: parseInt(form.price),
      comparePrice: form.comparePrice ? parseInt(form.comparePrice) : null,
      sizes: form.sizes ? form.sizes.split(",").map((s: string) => s.trim()) : [],
      colors: form.colors ? form.colors.split(",").map((c: string) => ({ name: c.trim(), hex: "#ccc" })) : [],
      materials: form.materials ? form.materials.split(",").map((m: string) => m.trim()) : [],
      occasions: form.occasions ? form.occasions.split(",").map((o: string) => o.trim()) : [],
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/products");
    }
    setSaving(false);
  };

  const inputClass = "w-full h-10 px-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-zinc-800 transition-colors";
  const labelClass = "block text-xs font-medium text-zinc-600 mb-1";

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <Link href="/admin/products" className="text-xs text-zinc-500 hover:text-zinc-800">&larr; Back</Link>
        <h2 className="text-lg font-medium">New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white rounded-2xl border border-zinc-200 p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Product Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Tagline</label>
            <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} h-auto py-2 resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Price (₹)</label>
            <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Compare Price (₹)</label>
            <input type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              <option value="apparel">Apparel</option>
              <option value="gifts">Gifts</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Collection</label>
            <select value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })} className={inputClass}>
              <option>The Apparel Collection</option>
              <option>The Gifting Collection</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Sizes (comma separated)</label>
            <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className={inputClass} placeholder="XS, S, M, L" />
          </div>
          <div>
            <label className={labelClass}>Delivery Estimate</label>
            <input value={form.deliveryEstimate} onChange={(e) => setForm({ ...form, deliveryEstimate: e.target.value })} className={inputClass} placeholder="5-7" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Materials (comma separated)</label>
            <input value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          {["isBestSeller", "isNew", "isCustomizable", "isGiftReady", "isPremiumPackaging"].map((field) => (
            <label key={field} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={!!form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.checked })}
                className="rounded"
              />
              {field.replace("is", "").replace(/([A-Z])/g, " $1").trim()}
            </label>
          ))}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 h-10 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
