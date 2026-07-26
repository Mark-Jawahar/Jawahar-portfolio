"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.08 0.01 280 / 0.9)",
            border: "1px solid oklch(1 0 0 / 0.1)",
            color: "oklch(0.96 0.01 280)",
            backdropFilter: "blur(20px)",
          },
        }}
      />
    </>
  );
}
