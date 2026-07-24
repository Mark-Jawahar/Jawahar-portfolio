"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  MessageCircle,
  Award,
  Eye,
  Clock,
  Edit3,
  Plus,
  Trash2,
  Save,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const statsCards = [
  { icon: Eye, label: "Portfolio Views", value: "1,234", change: "+12%", positive: true },
  { icon: Users, label: "Contact Messages", value: "48", change: "+8%", positive: true },
  { icon: TrendingUp, label: "Resume Downloads", value: "156", change: "+23%", positive: true },
  { icon: Clock, label: "Avg. Session", value: "3m 42s", change: "-5%", positive: false },
];

const recentMessages = [
  { name: "Sarah Johnson", email: "sarah@example.com", message: "Interested in collaborating on a customer success project...", time: "2 hours ago" },
  { name: "Rahul Patel", email: "rahul@example.com", message: "Great portfolio! Would love to discuss a leadership role...", time: "5 hours ago" },
  { name: "Emily Chen", email: "emily@example.com", message: "Your experience with team leadership is impressive...", time: "1 day ago" },
];

type TabView = "overview" | "about" | "experience" | "skills" | "projects" | "testimonials" | "social" | "resume" | "media" | "settings";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<TabView>("overview");

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <OverviewView />;
      case "about":
        return <EditorView title="About Section" />;
      case "experience":
        return <EditorView title="Experience" />;
      case "skills":
        return <EditorView title="Skills" />;
      case "projects":
        return <ProjectsManager />;
      case "testimonials":
        return <EditorView title="Testimonials" />;
      case "social":
        return <EditorView title="Social Links" />;
      case "resume":
        return <ResumeUpload />;
      case "media":
        return <MediaLibrary />;
      case "settings":
        return <EditorView title="Settings" />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(["overview", "about", "experience", "skills", "projects", "testimonials", "social", "resume", "media", "settings"] as TabView[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveView(tab)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize",
              activeView === tab
                ? "bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20"
                : "text-muted hover:text-foreground bg-card border border-border"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}

function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-[#2563eb]/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-[#2563eb]" />
                </div>
                <span className={cn("text-xs font-medium", stat.positive ? "text-emerald-400" : "text-red-400")}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.email} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <div className="h-8 w-8 rounded-full bg-[#2563eb]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-[#2563eb]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{msg.name}</span>
                    <span className="text-xs text-muted">{msg.time}</span>
                  </div>
                  <p className="text-xs text-muted mt-0.5 truncate">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { icon: Edit3, label: "Edit About Section", color: "text-[#2563eb]" },
              { icon: Plus, label: "Add New Project", color: "text-[#7c3aed]" },
              { icon: Award, label: "Update Achievements", color: "text-emerald-400" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <Icon className={cn("h-4 w-4", action.color)} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorView({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="primary" size="sm">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input defaultValue="About Me" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea defaultValue="Your description here..." rows={4} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea defaultValue="Your content here..." rows={8} />
        </div>
      </div>
    </div>
  );
}

function ProjectsManager() {
  const projects = [
    { title: "Customer Success Operations", status: "Published" },
    { title: "AI Website Concepts", status: "Published" },
    { title: "Investment Portfolio Planning", status: "Draft" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
          >
            <div>
              <div className="text-sm font-medium">{project.title}</div>
              <Badge variant={project.status === "Published" ? "success" : "default"}>
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-white/5 transition-colors">
                <Edit3 className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-red-400 hover:bg-red-500/5 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeUpload() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 max-w-3xl">
      <h3 className="text-lg font-semibold mb-6">Resume</h3>
      <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-[#2563eb]/30 transition-colors">
        <div className="h-12 w-12 rounded-2xl bg-[#2563eb]/10 flex items-center justify-center mx-auto mb-4">
          <ExternalLink className="h-6 w-6 text-[#2563eb]" />
        </div>
        <p className="text-sm font-medium mb-1">Drop your resume here</p>
        <p className="text-xs text-muted mb-4">PDF format, max 10MB</p>
        <Button variant="secondary" size="sm">
          Choose File
        </Button>
      </div>
    </div>
  );
}

function MediaLibrary() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Media Library</h3>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Upload
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl border border-border bg-card flex items-center justify-center text-muted hover:border-[#2563eb]/30 transition-colors group cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-2 opacity-30">
                <Image />
              </div>
              <p className="text-xs">Image {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Image() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
