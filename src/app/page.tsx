import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionsShowcase from "@/components/home/CollectionsShowcase";
import BrandStory from "@/components/home/BrandStory";
import FeaturesSection from "@/components/home/FeaturesSection";
import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <FeaturedProducts />
      <CollectionsShowcase />
      <BrandStory />
      <FeaturesSection />
      <CraftsmanshipSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
