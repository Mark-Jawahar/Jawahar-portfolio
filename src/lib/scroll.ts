import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

const NAV_DURATION = 1.4;
const NAV_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      duration: NAV_DURATION,
      easing: NAV_EASING,
    });
  } else {
    el.scrollIntoView();
  }
}
