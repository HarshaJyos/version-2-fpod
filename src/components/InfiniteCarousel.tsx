"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SlideItem {
    src: string;
    alt: string;
}

interface InfiniteCarouselProps {
    images: SlideItem[];
    interval?: number;
    className?: string;
}

// The slide always enters from the right and exits to the left — same direction always
const variants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
};

const transition = { duration: 0.55, ease: [0.32, 0.72, 0, 1] as any };

export default function InfiniteCarousel({ images, interval = 3200, className = "" }: InfiniteCarouselProps) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const next = useCallback(() => {
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    // Auto-advance
    useEffect(() => {
        if (paused) return;
        timerRef.current = setTimeout(next, interval);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [index, paused, next, interval]);

    // Dot navigation
    const goTo = (i: number) => {
        setIndex(i);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    return (
        /* 4:5 aspect ratio wrapper — portrait orientation */
        <div
            className={`relative w-full rounded-3xl overflow-hidden bg-muted shadow-2xl select-none ${className}`}
            style={{ aspectRatio: "4 / 5" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                    key={index}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index].src}
                        alt={images[index].alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        draggable={false}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === index
                                ? "w-6 h-2 bg-white shadow-md"
                                : "w-2 h-2 bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>

            {/* Pause badge */}
            {paused && (
                <div className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    paused
                </div>
            )}
        </div>
    );
}
