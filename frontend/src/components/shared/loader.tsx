"use client";
import { motion } from "framer-motion";
export function Loader({ label = "Loading" }: { label?: string }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-canvas" role="status" aria-live="polite"><div className="flex flex-col items-center gap-4"><motion.div className="h-10 w-10 rounded-full border border-gold border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} /><span className="text-xs uppercase tracking-[0.2em] text-gold">{label}</span></div></div>; }
