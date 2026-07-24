"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineEnvelope,
  HiOutlineUsers,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: HiOutlineSquares2X2 },
  { href: "/admin/products", label: "Products", icon: HiOutlineShoppingBag },
  { href: "/admin/orders", label: "Orders", icon: HiOutlineTruck },
  { href: "/admin/messages", label: "Messages", icon: HiOutlineEnvelope },
  { href: "/admin/subscribers", label: "Subscribers", icon: HiOutlineUsers },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hbp-token");
    const user = localStorage.getItem("hbp-user");
    if (!token || !user) {
      router.push("/admin/login");
      return;
    }
    const parsed = JSON.parse(user);
    if (parsed.role !== "admin") {
      router.push("/");
      return;
    }
    setIsAuthed(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
      </div>
    );
  }

  if (!isAuthed) return null;

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem("hbp-token");
    localStorage.removeItem("hbp-user");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      <div
        className={`fixed inset-0 bg-black/30 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 w-64 bg-white border-r border-zinc-200 z-50 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-zinc-200">
          <Link href="/admin" className="font-serif text-lg tracking-wide">
            HBP Admin
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-zinc-100 text-zinc-900 font-medium" : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-800">
              View Site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-600">
              <HiOutlineArrowRightOnRectangle className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <HiOutlineBars3 className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-zinc-800">
              {adminLinks.find((l) => l.href === pathname || (l.href !== "/admin" && pathname.startsWith(l.href)))?.label || "Dashboard"}
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
