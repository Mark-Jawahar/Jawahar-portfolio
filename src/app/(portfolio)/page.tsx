import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Impact } from "@/sections/impact";
import { Journey } from "@/sections/journey";
import { Resume } from "@/sections/resume";
import { Contact } from "@/sections/contact";

export default function PortfolioPage() {
  return (
    <div id="portfolio-content">
      <Hero />
      <div className="relative z-10">
        <About />
        <Impact />
        <Journey />
        <Resume />
        <Contact />
      </div>
    </div>
  );
}
