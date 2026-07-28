"use client";

import { ArrowUp } from "lucide-react";
import { profile, socialLinks } from "@/lib/resume-data";
import { scrollToTop } from "@/lib/utils";

const SvgIcon = ({ path, viewBox = "0 0 24 24" }: { path: string; viewBox?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <SvgIcon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  instagram: <SvgIcon path="M4 4h16v16H4z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M16.5 7.5v.01" />,
  mail: <SvgIcon path="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />,
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300"
                style={{
                  color: "rgba(142,142,147,0.6)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.10), 0 2px 8px rgba(0,0,0,0.06)",
                  backdropFilter: "blur(16px) saturate(1.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "#e8e8ed";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "inset 0 1.5px 0 rgba(255,255,255,0.14), 0 4px 16px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.color = "rgba(142,142,147,0.6)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "inset 0 1.5px 0 rgba(255,255,255,0.10), 0 2px 8px rgba(0,0,0,0.06)";
                }}
                aria-label={link.label}
              >
                {iconMap[link.icon] || null}
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToTop(true)}
            className="flex items-center gap-2 text-sm text-muted hover:text-ice transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>

        <div className="text-center text-sm text-muted/60 leading-relaxed">
          <p>&copy; {new Date().getFullYear()} {profile.name}. Crafted with intention.</p>
          <p className="mt-1">Built from scratch with Next.js, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
