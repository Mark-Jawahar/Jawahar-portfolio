"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer select-none active:scale-[0.97] focus-ring";

    const variants = {
      primary:
        "bg-[var(--color-text-primary)] text-white hover:opacity-90 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
      secondary:
        "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-overlay)]",
      ghost:
        "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-overlay)]",
      outline:
        "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-white",
      accent:
        "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-[var(--shadow-sm)]",
    };

    const sizes = {
      sm: "h-9 px-5 text-xs rounded-[var(--radius-md)] gap-1.5",
      md: "h-12 px-8 text-sm rounded-[var(--radius-lg)] gap-2",
      lg: "h-14 px-10 text-sm rounded-[var(--radius-lg)] gap-2.5",
      xl: "h-16 px-12 text-base rounded-[var(--radius-xl)] gap-3",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || isLoading) ? "opacity-40 cursor-not-allowed pointer-events-none" : "",
          className
        )}
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
