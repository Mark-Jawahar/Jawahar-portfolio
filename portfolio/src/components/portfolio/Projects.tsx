"use client";

import { motion } from "framer-motion";
import { FolderKanban, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Customer Success Operations",
    description:
      "Led initiatives to improve customer onboarding, retention, and customer satisfaction through streamlined processes and data-driven strategies.",
    tags: ["Customer Success", "Operations", "Process Improvement"],
    gradient: "from-[#2563eb] to-[#1d4ed8]",
  },
  {
    title: "AI Website Concepts",
    description:
      "Designed premium AI-powered website concepts inspired by Apple-level UI, combining cutting-edge design with seamless user experiences.",
    tags: ["UI/UX", "AI", "Design"],
    gradient: "from-[#7c3aed] to-[#6d28d9]",
  },
  {
    title: "Investment Portfolio Planning",
    description:
      "Built long-term investment strategies focused on mutual funds, ETFs, and wealth creation using data analysis and market research.",
    tags: ["Finance", "Analysis", "Strategy"],
    gradient: "from-[#059669] to-[#047857]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-premium px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-16"
        >
          <span className="section-label">
            <FolderKanban className="h-3 w-3" />
            Projects
          </span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-description">
            A selection of projects that showcase my expertise in customer
            success, design, and strategic planning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-[#2563eb]/30 hover:shadow-xl hover:shadow-[#2563eb]/5"
            >
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <FolderKanban className="h-20 w-20 text-white" />
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#2563eb] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
