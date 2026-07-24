"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/portfolio/Header").then((m) => m.Header), { ssr: false });
const Hero = dynamic(() => import("@/components/portfolio/Hero").then((m) => m.Hero), { ssr: false });
const About = dynamic(() => import("@/components/portfolio/About").then((m) => m.About), { ssr: false });
const Achievements = dynamic(() => import("@/components/portfolio/Achievements").then((m) => m.Achievements), { ssr: false });
const Experience = dynamic(() => import("@/components/portfolio/Experience").then((m) => m.Experience), { ssr: false });
const Skills = dynamic(() => import("@/components/portfolio/Skills").then((m) => m.Skills), { ssr: false });
const Projects = dynamic(() => import("@/components/portfolio/Projects").then((m) => m.Projects), { ssr: false });
const TimelineSection = dynamic(() => import("@/components/portfolio/Timeline").then((m) => m.TimelineSection), { ssr: false });
const Testimonials = dynamic(() => import("@/components/portfolio/Testimonials").then((m) => m.Testimonials), { ssr: false });
const Contact = dynamic(() => import("@/components/portfolio/Contact").then((m) => m.Contact), { ssr: false });
const Footer = dynamic(() => import("@/components/portfolio/Footer").then((m) => m.Footer));
const ScrollProgress = dynamic(() => import("@/components/portfolio/ScrollProgress").then((m) => m.ScrollProgress), { ssr: false });
const CursorGlow = dynamic(() => import("@/components/portfolio/CursorGlow").then((m) => m.CursorGlow), { ssr: false });
const ParticleBackground = dynamic(() => import("@/components/portfolio/ParticleBackground").then((m) => m.ParticleBackground), { ssr: false });
const FloatingGradient = dynamic(() => import("@/components/portfolio/FloatingGradient").then((m) => m.FloatingGradient));
const CommandPalette = dynamic(() => import("@/components/CommandPalette").then((m) => m.CommandPalette), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <ParticleBackground />
      <FloatingGradient />
      <CommandPalette />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Achievements />
        <Experience />
        <Skills />
        <Projects />
        <TimelineSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
