import React, { forwardRef } from "react";

export type BadgeVariant = "mono" | "emerald";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  mono: "bg-white/5 text-neutral-300 border border-white/10",
  emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "mono", dot = false, className = "", children, ...props }, ref) => {
    const classes = [
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono tabular-nums font-medium rounded-full select-none",
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span
            className={`size-1.5 rounded-full animate-pulse ${
              variant === "emerald" ? "bg-emerald-400" : "bg-neutral-400"
            }`}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
