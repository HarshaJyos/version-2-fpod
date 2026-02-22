"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const images = [
    { src: "/images/finalMachine.png", alt: "Freshpod Machine Hero", category: "Product" },
    { src: "/images/advanced sanitization.jpg", alt: "Advanced Sanitization", category: "Features" },
    { src: "/images/TimeSaving.jpg", alt: "Time Saving Efficiency", category: "Features" },
    { src: "/images/odor.jpg", alt: "Odor Free Experience", category: "Features" },
    { src: "/images/easy to use.png", alt: "Easy to Use Interface", category: "Features" },
    { src: "/images/CostOptimization.jpg", alt: "Cost Optimization", category: "Benefits" },
    { src: "/images/enhanced helmet.jfif", alt: "Enhanced Durability", category: "Benefits" },
    { src: "/images/Machine.png", alt: "Freshpod Machine Alternative View", category: "Product" },
    { src: "/images/profit.jpg", alt: "Profit Calculator Focus", category: "Business" },
    { src: "/images/racing-helmet.png", alt: "Racing Helmet Cleaning", category: "Use Cases" },
];

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemAnim: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function GalleryPage() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <div className="min-h-screen py-16 bg-background">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-4">Our Gallery</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore the Freshpod ecosystem, features, and advantages through our visual showcase.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer} initial="hidden" animate="visible"
                    className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                >
                    {images.map((img, i) => (
                        <motion.div
                            key={i} variants={itemAnim}
                            className="relative rounded-2xl overflow-hidden group mb-6 break-inside-avoid shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-white border border-border/50"
                            onClick={() => setSelectedImg(img.src)}
                        >
                            <div className="relative w-full aspect-auto">
                                {/* Fixed height placeholder for masonry item; layout fills via image proportions */}
                                <Image
                                    src={img.src} alt={img.alt}
                                    width={800} height={600}
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 cursor-pointer">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                                            {img.category}
                                        </span>
                                        <h3 className="text-white font-medium text-lg font-outfit">{img.alt}</h3>
                                    </div>
                                    <ZoomIn className="text-white w-6 h-6 hover:scale-125 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setSelectedImg(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-black/50 p-2 rounded-full hover:bg-black"
                            onClick={() => setSelectedImg(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh] rounded-xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
                        >
                            <Image
                                src={selectedImg} alt="Enlarged gallery image"
                                fill className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
