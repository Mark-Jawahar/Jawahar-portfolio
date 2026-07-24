"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code2,
  FolderKanban,
  Trophy,
  MessageSquare,
  Link2,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "#overview", id: "overview" },
  { icon: User, label: "About", href: "#about", id: "about" },
  { icon: Briefcase, label: "Experience", href: "#experience", id: "experience" },
  { icon: Code2, label: "Skills", href: "#skills", id: "skills" },
  { icon: FolderKanban, label: "Projects", href: "#projects", id: "projects" },
  { icon: Trophy, label: "Achievements", href: "#achievements", id: "achievements" },
  { icon: MessageSquare, label: "Testimonials", href: "#testimonials", id: "testimonials" },
  { icon: Link2, label: "Social Links", href: "#social", id: "social" },
  { icon: FileText, label: "Resume", href: "#resume", id: "resume" },
  { icon: Image, label: "Media", href: "#media", id: "media" },
  { icon: Settings, label: "Settings", href: "#settings", id: "settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold"
            >
              <span className="text-gradient">Admin</span>
            </motion.span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                !sidebarOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  activeTab === item.id
                    ? "bg-[#2563eb]/10 text-[#2563eb]"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-white/5 transition-colors md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex-1" />
          <button className="h-9 px-4 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
            View Portfolio
          </button>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
