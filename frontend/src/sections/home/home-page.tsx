"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader } from "@/components/shared/loader";
import { LogoReveal } from "@/sections/home/logo-reveal";
import { Hero } from "@/sections/home/hero";
import { AboutPreview, BookingCta, InstagramSection, PortfolioSection, ServicesSection, WhyChooseMe } from "@/sections/home/home-sections";
export function HomePage() { const [stage, setStage] = useState<"loading" | "reveal" | "ready">("loading"); useEffect(() => { const loader = window.setTimeout(() => setStage("reveal"), 1200); const reveal = window.setTimeout(() => setStage("ready"), 2150); return () => { window.clearTimeout(loader); window.clearTimeout(reveal); }; }, []); const blocked = stage !== "ready"; return <><AnimatePresence>{stage === "loading" && <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.35 }}><Loader label="Akshay Markad Photography" /></motion.div>}{stage === "reveal" && <LogoReveal />}</AnimatePresence><div aria-hidden={blocked} className={blocked ? "pointer-events-none" : ""}><Hero /><PortfolioSection /><AboutPreview /><ServicesSection /><WhyChooseMe /><InstagramSection /><BookingCta /></div></>; }
