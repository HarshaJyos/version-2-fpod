"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, ArrowRight, CalendarDays,
    ChevronLeft, ChevronRight, X,
    SlidersHorizontal, Check
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const POSTS_PER_PAGE = 6;

// ─────────────────────────────────────────
// Blog Card
// ─────────────────────────────────────────
function BlogCard({ post }: { post: any }) {
    return (
        <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 rounded-2xl overflow-hidden">
                    <div className="relative h-44 w-full overflow-hidden bg-muted">
                        <Image src={post.banner} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs flex-wrap">
                            <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                            <span className="opacity-40">·</span>
                            <span className="truncate">{post.author}</span>
                        </div>
                        <h2 className="font-bold font-outfit text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">{post.description}</p>
                        <div className="flex items-center gap-1.5 text-primary font-semibold text-sm pt-1">
                            Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────
function Pagination({ total, current, perPage, onChange }: { total: number; current: number; perPage: number; onChange: (p: number) => void }) {
    const totalPages = Math.ceil(total / perPage);
    if (totalPages <= 1) return null;

    // Smart page window: show up to 5 pages
    const getPages = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (current <= 3) return [1, 2, 3, 4, 5];
        if (current >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [current - 2, current - 1, current, current + 1, current + 2];
    };

    return (
        <div className="flex items-center justify-center gap-1.5 mt-12 select-none flex-wrap">
            <button onClick={() => onChange(current - 1)} disabled={current === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft className="w-4 h-4" />
            </button>
            {current > 3 && totalPages > 5 && (
                <><button onClick={() => onChange(1)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary text-sm transition-all">1</button>
                    <span className="text-muted-foreground px-1 text-sm">…</span></>
            )}
            {getPages().map((p) => (
                <button key={p} onClick={() => onChange(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${p === current ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"}`}>
                    {p}
                </button>
            ))}
            {current < totalPages - 2 && totalPages > 5 && (
                <><span className="text-muted-foreground px-1 text-sm">…</span>
                    <button onClick={() => onChange(totalPages)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary text-sm transition-all">{totalPages}</button></>
            )}
            <button onClick={() => onChange(current + 1)} disabled={current === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

// ─────────────────────────────────────────
// Sidebar Filter Card (Desktop)
// ─────────────────────────────────────────
function SidebarFilters({ allAuthors, activeAuthor, onAuthor, hasFilters, onClear }: {
    allAuthors: string[]; activeAuthor: string; onAuthor: (a: string) => void; hasFilters: boolean; onClear: () => void;
}) {
    return (
        <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28 bg-white border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
                    <h3 className="font-semibold font-outfit text-foreground text-sm">Authors</h3>
                    {hasFilters && (
                        <button onClick={onClear} className="text-xs text-primary hover:underline font-medium">Clear</button>
                    )}
                </div>
                <nav className="px-3 py-3 space-y-0.5">
                    {allAuthors.map((author) => {
                        const active = activeAuthor === author;
                        return (
                            <button key={author} onClick={() => onAuthor(author)}
                                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}>
                                <span className="truncate">{author}</span>
                                {active && <Check className="w-3.5 h-3.5 flex-shrink-0 text-primary" />}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

// ─────────────────────────────────────────
// Mobile Filter Bottom Sheet
// ─────────────────────────────────────────
function MobileFilterSheet({ open, onClose, allAuthors, activeAuthor, onAuthor, onClear, hasFilters }: {
    open: boolean; onClose: () => void; allAuthors: string[]; activeAuthor: string;
    onAuthor: (a: string) => void; onClear: () => void; hasFilters: boolean;
}) {
    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    {/* Sheet */}
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 shadow-2xl max-h-[75vh] flex flex-col">
                        {/* Handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-border" />
                        </div>
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
                            <h3 className="font-bold font-outfit text-foreground">Filter by Author</h3>
                            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                        {/* Tags list — scrollable */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
                            {allAuthors.map((author) => {
                                const active = activeAuthor === author;
                                return (
                                    <button key={author} onClick={() => { onAuthor(author); onClose(); }}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground border border-transparent"}`}>
                                        <span>{author}</span>
                                        {active && <Check className="w-4 h-4 text-primary" />}
                                    </button>
                                );
                            })}
                        </div>
                        {/* Footer */}
                        {hasFilters && (
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

// ─────────────────────────────────────────
// Main Client Component
// ─────────────────────────────────────────
export default function BlogClient({ blogs }: { blogs: any[] }) {
    const [search, setSearch] = useState("");
    const [activeAuthor, setActiveAuthor] = useState("All");
    const [page, setPage] = useState(1);
    const [sheetOpen, setSheetOpen] = useState(false);

    const allAuthors = useMemo(() => {
        const s = new Set<string>();
        blogs.forEach((b) => {
            if (b.author) s.add(b.author);
        });
        return ["All", ...Array.from(s)];
    }, [blogs]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return blogs.filter((post) => {
            const matchAuthor = activeAuthor === "All" || post.author === activeAuthor;
            const matchSearch = !q || post.title.toLowerCase().includes(q) || post.description.toLowerCase().includes(q) || (post.author && post.author.toLowerCase().includes(q));
            return matchAuthor && matchSearch;
        });
    }, [blogs, search, activeAuthor]);

    const handleSearch = useCallback((val: string) => { setSearch(val); setPage(1); }, []);
    const handleAuthor = useCallback((author: string) => { setActiveAuthor(author); setPage(1); }, []);
    const handleClear = useCallback(() => { setSearch(""); setActiveAuthor("All"); setPage(1); }, []);

    const paginated = useMemo(() => {
        const start = (page - 1) * POSTS_PER_PAGE;
        return filtered.slice(start, start + POSTS_PER_PAGE);
    }, [filtered, page]);

    const hasFilters = search !== "" || activeAuthor !== "All";

    const handlePageChange = (p: number) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background">

            {/* Hero Header */}
            <section className="py-20 bg-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#22c55e_0%,transparent_60%)]" />
                <div className="container px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <span className="inline-block bg-primary/20 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-5 border border-primary/30">
                            FreshPod Blog
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white mb-5">Insights & Updates</h1>
                        <p className="text-base md:text-lg text-white/65 max-w-xl mx-auto">
                            Science, safety, and innovation — everything you need to know about helmet hygiene in India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Search Bar */}
            <div className="sticky top-[62px] z-30 bg-white/95 backdrop-blur-md border-b border-border/40 shadow-sm">
                <div className="container px-4 py-3.5">
                    <div className="flex items-center gap-3 max-w-3xl mx-auto lg:mx-0">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search articles…"
                                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60" />
                            {search && (
                                <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Mobile: Filter button */}
                        <button onClick={() => setSheetOpen(true)}
                            className={`lg:hidden flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${hasFilters && activeAuthor !== "All" ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"}`}>
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters{hasFilters && activeAuthor !== "All" ? " ·" : ""}</span>
                            {hasFilters && activeAuthor !== "All" && (
                                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">1</span>
                            )}
                        </button>

                        {/* Desktop: Clear filters pill */}
                        {hasFilters && (
                            <button onClick={handleClear}
                                className="hidden lg:flex flex-shrink-0 items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border/60 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                                <X className="w-3 h-3" /> Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Page Body */}
            <div className="container px-4 py-10">
                <div className="flex gap-8 max-w-7xl mx-auto">

                    {/* Desktop Sidebar */}
                    <SidebarFilters
                        allAuthors={allAuthors}
                        activeAuthor={activeAuthor}
                        onAuthor={handleAuthor}
                        hasFilters={activeAuthor !== "All"}
                        onClear={() => handleAuthor("All")}
                    />

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Result count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-muted-foreground">
                                {filtered.length === 0 ? "No articles found" : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}${hasFilters ? " found" : ""}`}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {paginated.length > 0 ? (
                                <motion.div key={`${search}-${activeAuthor}-${page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                                    className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {paginated.map((post: any) => <BlogCard key={post.slug} post={post} />)}
                                </motion.div>
                            ) : (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="py-24 text-center space-y-3">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                                        <Search className="w-7 h-7 text-muted-foreground" />
                                    </div>
                                    <p className="text-foreground font-semibold font-outfit text-lg">No articles match</p>
                                    <p className="text-muted-foreground text-sm">Try a different keyword or clear your filters.</p>
                                    <button onClick={handleClear} className="text-sm text-primary hover:underline font-semibold mt-1">Clear all filters</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Pagination total={filtered.length} current={page} perPage={POSTS_PER_PAGE} onChange={handlePageChange} />
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sheet */}
            <MobileFilterSheet
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
                allAuthors={allAuthors}
                activeAuthor={activeAuthor}
                onAuthor={handleAuthor}
                onClear={handleClear}
                hasFilters={activeAuthor !== "All"}
            />
        </div>
    );
}
