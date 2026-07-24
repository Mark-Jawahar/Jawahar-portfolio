"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlinePhoto, HiOutlineXMark, HiOutlineArrowUpTray } from "react-icons/hi2";

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "", tagline: "", description: "", price: "", comparePrice: "",
    category: "apparel", collection: "The Apparel Collection",
    sizes: "", colors: "", materials: "", deliveryEstimate: "5-7",
    isBestSeller: false, isNew: false, isCustomizable: false, isGiftReady: false, isPremiumPackaging: false,
    occasions: "", inStock: true,
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setUploading(true);
    const token = localStorage.getItem("hbp-token");
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (res.ok) {
        const data = await res.json();
        setImages((prev) => [...prev, data.url]);
      }
    }
    setUploading(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }, [uploadFiles]);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("hbp-token");
    const body = {
      ...form,
      price: parseInt(form.price),
      comparePrice: form.comparePrice ? parseInt(form.comparePrice) : null,
      images,
      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
      colors: form.colors ? form.colors.split(",").map((c) => ({ name: c.trim(), hex: "#ccc" })) : [],
      materials: form.materials ? form.materials.split(",").map((m) => m.trim()) : [],
      occasions: form.occasions ? form.occasions.split(",").map((o) => o.trim()) : [],
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) router.push("/admin/products");
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
        <div>
          <label className={labelClass}>Product Images</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              dragOver ? "border-zinc-800 bg-zinc-50" : "border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <HiOutlineArrowUpTray className="w-6 h-6 text-zinc-400" />
            <p className="text-xs text-zinc-500">Drop images here or click to upload</p>
            <p className="text-[10px] text-zinc-400">PNG, JPG up to 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => { if (e.target.files?.length) uploadFiles(e.target.files); }}
            />
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {images.map((url, i) => (
                <div key={i} className="relative w-16 h-20 rounded-lg overflow-hidden bg-zinc-100 group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  ><HiOutlineXMark className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
          {uploading && <p className="text-xs text-zinc-400 mt-2">Uploading...</p>}
        </div>

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
            <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className={inputClass} placeholder="XS, S, M, L, XL" />
          </div>
          <div>
            <label className={labelClass}>Colors (comma separated)</label>
            <input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className={inputClass} placeholder="Red, Blue, Black" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Materials (comma separated)</label>
            <input value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Delivery Estimate</label>
            <input value={form.deliveryEstimate} onChange={(e) => setForm({ ...form, deliveryEstimate: e.target.value })} className={inputClass} placeholder="5-7" />
          </div>
          <div>
            <label className={labelClass}>Occasions (comma separated)</label>
            <input value={form.occasions} onChange={(e) => setForm({ ...form, occasions: e.target.value })} className={inputClass} placeholder="Birthday, Anniversary" />
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

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="px-6 h-10 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Product"}
          </button>
          {uploading && <span className="text-xs text-zinc-400">Uploading images...</span>}
        </div>
      </form>
    </div>
  );
}
