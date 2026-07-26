"use client";

import { useEffect } from "react";
import { scrollToTop } from "@/lib/utils";

export function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      scrollToTop(false);
    }
  }, []);

  return null;
}
