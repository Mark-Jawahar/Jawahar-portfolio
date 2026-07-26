import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { Header } from "@/components/shared/header";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Header />
      <main className="flex-1">{children}</main>
    </SmoothScroll>
  );
}
