"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  isMagnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, isMagnetic, children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer select-none";

    const variants = {
      primary:
        "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-85 active:scale-[0.97]",
      secondary:
        "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-overlay)] active:scale-[0.97]",
      ghost:
        "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-overlay)] active:scale-[0.97]",
      outline:
        "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] active:scale-[0.97]",
      accent:
        "bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-hover)] active:scale-[0.97]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-[var(--radius-button)] gap-1.5",
      md: "h-11 px-6 text-sm rounded-[var(--radius-button)] gap-2",
      lg: "h-12 px-8 text-base rounded-[var(--radius-button)] gap-2.5",
      xl: "h-14 px-10 text-lg rounded-[var(--radius-button)] gap-3",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
