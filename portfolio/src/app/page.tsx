"use client";

import dynamic from "next/dynamic";
import { PageTransition } from "@/components/PageTransition";

const Navigation = dynamic(() => import("@/components/portfolio/Navigation").then((m) => m.Navigation), { ssr: false });
const Hero = dynamic(() => import("@/components/portfolio/Hero").then((m) => m.Hero), { ssr: false });
const About = dynamic(() => import("@/components/portfolio/About").then((m) => m.About), { ssr: false });
const Experience = dynamic(() => import("@/components/portfolio/Experience").then((m) => m.Experience), { ssr: false });
const WhyHireMe = dynamic(() => import("@/components/portfolio/WhyHireMe").then((m) => m.WhyHireMe), { ssr: false });
const Achievements = dynamic(() => import("@/components/portfolio/Achievements").then((m) => m.Achievements), { ssr: false });
const Skills = dynamic(() => import("@/components/portfolio/Skills").then((m) => m.Skills), { ssr: false });
const Projects = dynamic(() => import("@/components/portfolio/Projects").then((m) => m.Projects), { ssr: false });
const ResumeSection = dynamic(() => import("@/components/portfolio/ResumeSection").then((m) => m.ResumeSection), { ssr: false });
const Contact = dynamic(() => import("@/components/portfolio/Contact").then((m) => m.Contact), { ssr: false });
const Footer = dynamic(() => import("@/components/portfolio/Footer").then((m) => m.Footer));
const MeshGradient = dynamic(() => import("@/components/portfolio/MeshGradient").then((m) => m.MeshGradient), { ssr: false });
const Spotlight = dynamic(() => import("@/components/portfolio/Spotlight").then((m) => m.Spotlight), { ssr: false });
const BackgroundBeams = dynamic(() => import("@/components/portfolio/BackgroundBeams").then((m) => m.BackgroundBeams), { ssr: false });
const WebGLBackground = dynamic(() => import("@/components/portfolio/WebGLBackground").then((m) => m.WebGLBackground), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/portfolio/ScrollProgress").then((m) => m.ScrollProgress), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const FloatingDock = dynamic(() => import("@/components/portfolio/FloatingDock").then((m) => m.FloatingDock), { ssr: false });

export default function Home() {
  return (
    <PageTransition>
      <div className="noise-overlay" />
      <MeshGradient />
      <BackgroundBeams />
      <WebGLBackground />
      <Spotlight />
      <ScrollProgress />
      <CommandPalette />
      <Navigation />
      <FloatingDock />
      <main className="relative z-10">
        <Hero />
        <About />
        <Achievements />
        <Experience />
        <WhyHireMe />
        <Skills />
        <Projects />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
