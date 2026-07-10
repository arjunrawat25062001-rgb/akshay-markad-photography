"use client";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; isLoading?: boolean; children: ReactNode };
const variants: Record<ButtonVariant, string> = { primary: "bg-gold text-black hover:bg-gold-hover focus-visible:ring-gold", secondary: "border border-white/20 text-white hover:border-gold hover:text-gold", ghost: "text-white hover:bg-white/10 hover:text-gold", icon: "h-11 w-11 rounded-full border border-white/15 text-white hover:border-gold hover:text-gold" };
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant = "primary", isLoading = false, disabled, children, ...props }, ref) { return <motion.span whileTap={{ scale: 0.98 }} className="inline-flex"><button ref={ref} className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50", variants[variant], className)} disabled={disabled || isLoading} {...props}>{isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}{children}</button></motion.span>; });
