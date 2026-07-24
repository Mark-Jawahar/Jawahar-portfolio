"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineStar } from "react-icons/hi2";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
  images: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const token = localStorage.getItem("hbp-token");
    const res = await fetch("/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const token = localStorage.getItem("hbp-token");
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
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
        <h2 className="text-lg font-medium">Products ({products.length})</h2>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
        >
          <HiOutlinePlus className="w-3.5 h-3.5" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Product</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Price</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Category</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Rating</th>
              <th className="text-left p-4 text-xs text-zinc-500 font-medium">Status</th>
              <th className="text-right p-4 text-xs text-zinc-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <span className="text-xs font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-xs">₹{product.price.toLocaleString("en-IN")}</td>
                <td className="p-4 text-xs capitalize">{product.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-xs">
                    <HiOutlineStar className="w-3 h-3 text-amber-400" />
                    {product.rating}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-1.5 rounded-lg hover:bg-zinc-100"
                    >
                      <HiOutlinePencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <HiOutlineTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
