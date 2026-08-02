import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { HowIWork } from "@/sections/how-i-work";
import { Impact } from "@/sections/impact";
import { Journey } from "@/sections/journey";
import { CaseStudies } from "@/sections/case-studies";
import { Resume } from "@/sections/resume";
import { Contact } from "@/sections/contact";

export default function PortfolioPage() {
  return (
    <div id="portfolio-content">
      <Hero />
      <div className="relative z-10">
        <About />
        <HowIWork />
        <Impact />
        <Journey />
        <CaseStudies />
        <Resume />
        <Contact />
      </div>
    </div>
  );
}
