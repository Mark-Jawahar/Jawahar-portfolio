"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Box } from "lucide-react";

const projects = [
  {
    title: "AI Website Concepts",
    desc: "Premium AI-powered website concepts inspired by Apple-level UI. Personal explorations in design and interaction.",
    tags: ["UI/UX", "AI", "Design"],
    gradient: "from-[#a8d8ea] via-[#c4b5fd] to-[#a7f3d0]",
  },
  {
    title: "Customer Experience Frameworks",
    desc: "Built structured frameworks for customer onboarding, retention, and satisfaction measurement.",
    tags: ["Strategy", "Operations", "CX"],
    gradient: "from-[#c4b5fd] via-[#a8d8ea] to-[#fde68a]",
  },
  {
    title: "Figma Learning Journey",
    desc: "Actively learning Figma to design premium UI/UX. Exploring design systems, components, and prototyping.",
    tags: ["Figma", "UI/UX", "Learning"],
    gradient: "from-[#a7f3d0] via-[#fde68a] to-[#a8d8ea]",
  },
  {
    title: "Automation Workflows",
    desc: "Building automation workflows using AI tools like ChatGPT and Claude to streamline processes.",
    tags: ["AI", "Automation", "Process"],
    gradient: "from-[#fde68a] via-[#a7f3d0] to-[#c4b5fd]",
  },
  {
    title: "Investment Dashboard Concepts",
    desc: "Designed investment portfolio tracking dashboards focused on mutual funds, ETFs, and wealth visualizations.",
    tags: ["Finance", "UI", "Dashboard"],
    gradient: "from-[#a8d8ea] via-[#a7f3d0] to-[#fde68a]",
  },
  {
    title: "Prompt Engineering",
    desc: "Exploring prompt engineering techniques to improve AI output quality and automate repetitive tasks.",
    tags: ["AI", "ChatGPT", "Claude"],
    gradient: "from-[#c4b5fd] via-[#a8d8ea] to-[#a7f3d0]",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="h-full"
      style={{ transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-label"><Box className="h-3 w-3" />Things I&apos;m Building</span>
          <h2 className="section-title">
            Exploring &amp;<br />
            <span className="text-gradient-ice">building.</span>
          </h2>
          <p className="section-description">
            Personal projects, learning work, and explorations in design, AI, and product thinking.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard>
                <div className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] h-full">
                  <div className={`h-36 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                      <Box className="h-14 w-14 text-white" />
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium mb-1.5 group-hover:text-[#a8d8ea] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-white/30 leading-relaxed mb-3 line-clamp-2">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/25 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
