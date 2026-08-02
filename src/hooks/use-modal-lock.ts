"use client";

import { useEffect, type RefObject } from "react";
import { getLenis } from "@/lib/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Locks the page while a viewer/modal is open:
 * - Native scroll position is preserved (no position:fixed jump)
 * - Wheel / touch / keyboard scrolling never leaks to the page behind
 * - Escape closes, Tab is trapped inside the panel
 * - Lenis is paused so smooth-scroll can't fight the lock
 */
export function useModalLock(
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const content = document.getElementById("portfolio-content");
    if (content) content.classList.add("resume-viewer-active");

    const lenis = getLenis();
    lenis?.stop();

    const root = document.documentElement;
    const prevRootOverflow = root.style.overflow;
    const prevRootOverflowX = root.style.overflowX;
    const prevBodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    root.style.overflowX = "clip";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const prevFocus = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !panel.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !panel.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const frame = requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }
      panelRef.current
        ?.querySelector<HTMLElement>(FOCUSABLE)
        ?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      if (content) content.classList.remove("resume-viewer-active");
      lenis?.start();
      root.style.overflow = prevRootOverflow;
      root.style.overflowX = prevRootOverflowX;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.overscrollBehavior = "";
      document.removeEventListener("keydown", handleKeyDown);
      prevFocus?.focus();
    };
  }, [onClose, panelRef, initialFocusRef]);
}
