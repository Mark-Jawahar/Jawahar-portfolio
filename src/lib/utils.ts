export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(Math.abs(distance) * 0.4, 700);
  const startTime = performance.now();

  const ease = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export function scrollToTop(smooth = false) {
  if (!smooth) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }

  const startY = window.scrollY;
  const duration = Math.min(startY * 0.4, 600);
  const startTime = performance.now();

  const ease = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY * (1 - ease(progress)));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
