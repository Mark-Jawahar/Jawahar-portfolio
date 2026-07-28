"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { profile } from "@/lib/resume-data";
import { scrollToSection } from "@/lib/utils";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  const offsetX = reducedMotion ? 0 : (mouseX - 0.5) * 8;
  const offsetY = reducedMotion ? 0 : (mouseY - 0.5) * 8;

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-16 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 70% 40% at 50% 30%, rgba(111,128,149,0.03) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 80% 70%, rgba(201,195,184,0.02) 0%, transparent 50%)",
      }}
    >
      <div
        className="flex flex-col items-center text-center max-w-2xl mx-auto"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: "0.3s",
        }}
      >
        <div
          className="portrait-frame w-[10.5rem] h-[10.5rem] md:w-[13rem] md:h-[13rem] mb-10 animate-float-slow"
          style={{
            transform: `perspective(1000px) rotateY(${offsetX * 0.5}deg) rotateX(${-offsetY * 0.5}deg)`,
          }}
        >
          <div className="portrait-glow" />
          <Image
            src={profile.portraitUrl}
            alt={profile.name}
            width={260}
            height={260}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{
          background: "linear-gradient(135deg, rgba(201,195,184,0.10) 0%, rgba(111,128,149,0.05) 100%)",
          border: "1px solid rgba(201,195,184,0.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-silver/80 animate-pulse" style={{ background: "rgba(201,195,184,0.6)" }} />
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: "rgba(201,195,184,0.7)" }}>{profile.location}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.06] mb-4 text-pearl">
          {profile.name.split(" ")[0]}{" "}
          <span className="text-gradient">{profile.name.split(" ").slice(1).join(" ")}</span>
        </h1>

        <p className="text-base sm:text-lg font-medium text-ice/80 mb-2">
          {profile.role}
        </p>

         <p className="text-sm sm:text-base leading-relaxed max-w-[55ch] mx-auto mb-10" style={{ color: "rgba(142,142,147,0.8)" }}>
            Customer Experience Specialist with 5+ years of experience in Customer Onboarding, Customer Success, Client Relationship Management, and Customer Lifecycle Management across EdTech, Real Estate, and Financial Services. Passionate about delivering seamless customer experiences, improving operational processes, and building long-term customer relationships.
          </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("profile")}
            className="btn-primary group"
          >
            Explore
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("profile")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/40 hover:text-muted/80 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={20} className="animate-float-subtle" />
      </button>
    </section>
  );
}
