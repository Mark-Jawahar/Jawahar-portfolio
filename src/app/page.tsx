import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AuroraBackground from "@/components/effects/AuroraBackground";
import Particles from "@/components/effects/Particles";
import MouseGlow from "@/components/effects/MouseGlow";
import Hero from "@/components/chapters/Hero";
import About from "@/components/chapters/About";
import Impact from "@/components/chapters/Impact";
import Journey from "@/components/chapters/Journey";
import ProjectsChapter from "@/components/chapters/Projects";
import ResumeChapter from "@/components/chapters/Resume";
import Connect from "@/components/chapters/Connect";

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <Particles />
      <MouseGlow />
      <div className="noise-overlay" />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Impact />
        <Journey />
        <ProjectsChapter />
        <ResumeChapter />
        <Connect />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
