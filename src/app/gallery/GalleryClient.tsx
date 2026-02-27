"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ExternalLink, SlidersHorizontal, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const allImages = [
    { src: "/images/FM_1.png", alt: "FreshPod Machine – Sunflare Yellow Color", category: "Product" },
    { src: "/images/FM_2.png", alt: "FreshPod Machine – Carbon Black Color", category: "Product" },
    { src: "/images/FM_3.png", alt: "FreshPod Machine – Glacier Blue Color", category: "Product" },
    { src: "/images/FM_4.png", alt: "FreshPod Machine – Crimson Red Color", category: "Product" },
    { src: "/images/gallery/1.webp", alt: "Freshpod Machines", category: "Product" },
    { src: "/images/gallery/2.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/3.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/4.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/5.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/6.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/7.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/8.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/9.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/10.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/11.webp", alt: "Freshpod Event", category: "Freshpod Event" },
    { src: "/images/gallery/12.webp", alt: "Freshpod Event", category: "Freshpod Event" },
];

const ALL_CATS = ["All", ...Array.from(new Set(allImages.map((img) => img.category)))];

function SidebarFilters({ active, onSelect, hasFilter, onClear }: {
    active: string; onSelect: (c: string) => void; hasFilter: boolean; onClear: () => void;
}) {
    return (
        <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28 bg-white border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
                    <h3 className="font-semibold font-outfit text-foreground text-sm">Category</h3>
                    {hasFilter && <button onClick={onClear} className="text-xs text-primary hover:underline font-medium">Clear</button>}
                </div>
                <nav className="px-3 py-3 space-y-0.5">
                    {ALL_CATS.map((cat) => (
                        <button key={cat} onClick={() => onSelect(cat)}
                            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${active === cat ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}>
                            <span className="truncate">{cat}</span>
                            {active === cat && <Check className="w-3.5 h-3.5 flex-shrink-0 text-primary" />}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}

function MobileFilterSheet({ open, onClose, active, onSelect, onClear, hasFilter }: {
    open: boolean; onClose: () => void; active: string;
    onSelect: (c: string) => void; onClear: () => void; hasFilter: boolean;
}) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 shadow-2xl max-h-[75vh] flex flex-col">
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-border" />
                        </div>
                        <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
                            <h3 className="font-bold font-outfit text-foreground">Filter by Category</h3>
                            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
                            {ALL_CATS.map((cat) => (
                                <button key={cat} onClick={() => { onSelect(cat); onClose(); }}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${active === cat ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground border border-transparent"}`}>
                                    <span>{cat}</span>
                                    {active === cat && <Check className="w-4 h-4 text-primary" />}
                                </button>
                            ))}
                        </div>
                        {hasFilter && (
                            <div className="px-5 py-4 border-t border-border/40">
                                <button onClick={() => { onClear(); onClose(); }}
                                    className="w-full py-3 rounded-xl border border-border/60 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={onClose}>
            <button onClick={onClose} className="absolute top-5 right-5 text-white/50 hover:text-white bg-black/50 p-2 rounded-full hover:bg-black z-10 transition-colors">
                <X className="w-7 h-7" />
            </button>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
                className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <Image src={src} alt={alt} fill className="object-contain" />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">{alt}</p>
        </motion.div>
    );
}

export default function GalleryClient() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [sheetOpen, setSheetOpen] = useState(false);
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return allImages.filter((img) => {
            const matchCat = activeCategory === "All" || img.category === activeCategory;
            const matchSearch = !q || img.alt.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
            return matchCat && matchSearch;
        });
    }, [activeCategory, search]);

    const handleCat = useCallback((cat: string) => setActiveCategory(cat), []);
    const handleClear = useCallback(() => { setActiveCategory("All"); setSearch(""); }, []);
    const hasFilter = activeCategory !== "All" || search !== "";

    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <section className="py-20 bg-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,#22c55e_0%,transparent_60%)]" />
                <div className="container px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block bg-primary/20 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-6 border border-primary/30">Visual Showcase</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white mb-6">Our Gallery</h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Explore the FreshPod ecosystem — product views, features, and real-world deployments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Search + Filter Bar */}
            <div className="sticky top-[62px] z-30 bg-white/95 backdrop-blur-md border-b border-border/40 shadow-sm">
                <div className="container px-4 py-3.5">
                    <div className="flex items-center gap-3 max-w-3xl mx-auto lg:mx-0">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search images…"
                                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60" />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                        <button onClick={() => setSheetOpen(true)}
                            className={`lg:hidden flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activeCategory !== "All" ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"}`}>
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters</span>
                            {activeCategory !== "All" && <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">1</span>}
                        </button>
                        {hasFilter && (
                            <button onClick={handleClear} className="hidden lg:flex flex-shrink-0 items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border/60 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                                <X className="w-3 h-3" /> Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="container px-4 py-10">
                <div className="flex gap-8 max-w-7xl mx-auto">
                    <SidebarFilters active={activeCategory} onSelect={handleCat} hasFilter={activeCategory !== "All"} onClear={() => handleCat("All")} />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-muted-foreground">
                                {filtered.length === 0 ? "No images found" : `${filtered.length} image${filtered.length !== 1 ? "s" : ""}${hasFilter ? " found" : ""}`}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {filtered.length > 0 ? (
                                /* True masonry layout: CSS columns so images stack at their natural ratio.
                                   gap-3 keeps cards close together. break-inside: avoid prevents card splitting. */
                                <motion.div key={`${activeCategory}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                                    className="[column-count:1] sm:[column-count:2] xl:[column-count:3] gap-3 [column-gap:12px]">
                                    {filtered.map((img, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: i * 0.04 }}
                                            className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 bg-white border border-border/40 cursor-pointer w-full mb-3"
                                            style={{ breakInside: "avoid", WebkitColumnBreakInside: "avoid", pageBreakInside: "avoid", display: "inline-block" } as any}
                                            onClick={() => setLightbox({ src: img.src, alt: img.alt })}>
                                            <Image src={img.src} alt={img.alt} width={800} height={600}
                                                className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 inline-block">{img.category}</span>
                                                        <p className="text-white font-medium text-sm font-outfit leading-tight">{img.alt}</p>
                                                    </div>
                                                    <ZoomIn className="text-white w-5 h-5 flex-shrink-0" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center space-y-3">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                                        <Search className="w-7 h-7 text-muted-foreground" />
                                    </div>
                                    <p className="text-foreground font-semibold font-outfit text-lg">No images match</p>
                                    <p className="text-muted-foreground text-sm">Try a different keyword or clear your filters.</p>
                                    <button onClick={handleClear} className="text-sm text-primary hover:underline font-semibold mt-1">Clear all filters</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Drive CTA */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                            className="mt-14 bg-foreground rounded-3xl p-10 text-center space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold font-outfit text-white">More Photos on Google Drive</h2>
                            <p className="text-white/60 max-w-xl mx-auto text-sm">A larger collection of FreshPod photos and field deployment images is available on our Google Drive.</p>
                            <a href="https://drive.google.com/drive/folders/1Lw7smoF34yBpnI-HF6oQxsXsJnFD_FOD" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="rounded-full px-8 mt-2 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Full Gallery on Drive
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mobile Sheet */}
            <MobileFilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} active={activeCategory}
                onSelect={handleCat} onClear={handleClear} hasFilter={activeCategory !== "All"} />

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
            </AnimatePresence>
        </div>
    );
}
