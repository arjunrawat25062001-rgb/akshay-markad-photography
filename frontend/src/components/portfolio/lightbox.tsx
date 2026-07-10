"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { PortfolioImage, PortfolioItem } from "@/types/portfolio";

interface LightboxProps {
  images: Array<PortfolioImage | PortfolioItem>;
  initialIndex: number;
  onClose: () => void;
}

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const imageAnim: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 180, damping: 22 } },
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const normalizedImages: PortfolioImage[] = images.map((img) => {
    if ((img as PortfolioImage).src) return img as PortfolioImage;
    return (img as PortfolioItem).coverImage;
  });

  const image = normalizedImages[currentIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((value) => Math.min(value + 1, normalizedImages.length - 1));
      }
      if (event.key === "ArrowLeft") {
        setCurrentIndex((value) => Math.max(value - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [normalizedImages.length, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < normalizedImages.length - 1;

  // touch swipe support
  useEffect(() => {
    let startX: number | null = null;
    const onTouchStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && canNext) setCurrentIndex((v) => Math.min(v + 1, normalizedImages.length - 1));
        if (diff < 0 && canPrev) setCurrentIndex((v) => Math.max(v - 1, 0));
      }
      startX = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [canNext, canPrev, normalizedImages.length]);

  // preload neighbor images for smoother navigation
  useEffect(() => {
    const next = normalizedImages[currentIndex + 1];
    const prev = normalizedImages[currentIndex - 1];
    if (next) {
      const i = new window.Image();
      i.src = next.src;
    }
    if (prev) {
      const i2 = new window.Image();
      i2.src = prev.src;
    }
  }, [currentIndex, normalizedImages]);

  // focus trap
  useEffect(() => {
    const root = document.getElementById("lightbox-root");
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [currentIndex]);

  return (
    <AnimatePresence>
      <motion.div id="lightbox-root" initial="hidden" animate="visible" exit="hidden" variants={backdrop} className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-xl">
        <button onClick={onClose} className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/60 p-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Close lightbox">
          Close
        </button>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]" initial="hidden" animate="visible" exit="hidden" variants={imageAnim}>
            <Image src={image.src} alt={image.alt} fill className="object-cover" priority />
          </motion.div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-white/70">{currentIndex + 1}/{normalizedImages.length}</p>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white" disabled>
                Download
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    void navigator.share({ title: image.alt, text: image.alt });
                  } else {
                    void navigator.clipboard?.writeText(window.location.href);
                  }
                }}
                className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white"
              >
                Share
              </button>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={() => canPrev && setCurrentIndex((value) => value - 1)} disabled={!canPrev} className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:opacity-40">
              Previous
            </button>
            <button type="button" onClick={() => canNext && setCurrentIndex((value) => value + 1)} disabled={!canNext} className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
