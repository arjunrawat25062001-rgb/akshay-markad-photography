"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, pageTransition, sectionReveal } from "@/animations/variants";
export function FadeUp({ children, className }: { children: ReactNode; className?: string }) { const reduce = useReducedMotion(); return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reduce ? undefined : fadeUp}>{children}</motion.div>; }
export function SectionReveal({ children, className }: { children: ReactNode; className?: string }) { return <motion.section className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={sectionReveal}>{children}</motion.section>; }
export function PageTransition({ children }: { children: ReactNode }) { return <motion.main initial="initial" animate="animate" exit="exit" variants={pageTransition}>{children}</motion.main>; }
