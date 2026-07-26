import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { Navigation } from "@/components/layout/Navigation";
import { HeroChapter } from "@/components/chapters/HeroChapter";
import { WhoIAm } from "@/components/chapters/WhoIAm";
import { Impact } from "@/components/chapters/Impact";
import { Journey } from "@/components/chapters/Journey";
import { Craft } from "@/components/chapters/Craft";
import { ResumeChapter } from "@/components/chapters/ResumeChapter";
import { ConnectChapter } from "@/components/chapters/ConnectChapter";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <div className="noise-overlay" aria-hidden="true" />
      <AuroraBackground />

      <Navigation />
      <FloatingWhatsApp />

      <main className="relative z-10">
        <HeroChapter />
        <div className="border-t border-[rgba(255,255,255,0.04)]" />
        <WhoIAm />
        <div className="border-t border-[rgba(255,255,255,0.04)]" />
        <Impact />
        <div className="border-t border-[rgba(255,255,255,0.04)]" />
        <Journey />
        <div className="border-t border-[rgba(255,255,255,0.04)]" />
        <Craft />
        <div className="border-t border-[rgba(255,255,255,0.04)]" />
        <ResumeChapter />
        <div className="border-t border-[rgba(255,255,255,0.04)]" />
        <ConnectChapter />
      </main>

      <Footer />
    </>
  );
}
