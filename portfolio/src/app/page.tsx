import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Impact } from "@/components/impact";
import { Journey } from "@/components/journey";
import { InteractiveResume } from "@/components/interactive-resume";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Impact />
      <Journey />
      <InteractiveResume />
      <Contact />
      <Footer />
    </>
  );
}
