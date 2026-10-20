import React, { forwardRef } from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid: "bg-white text-black hover:bg-neutral-200 active:bg-neutral-300",
  outline: "bg-transparent text-white border border-white/10 hover:bg-white/5 hover:border-white/20 active:bg-white/10",
  ghost: "bg-transparent text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-3.5 py-2 rounded-lg gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", size = "md", type = "button", className = "", children, ...props }, ref) => {
    const classes = [
      "inline-flex items-center justify-center font-medium font-sans select-none transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0E]",
      "disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
