"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, Tag, ArrowLeft, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

// ─────────────────────────────────────────
// Content Block Renderers
// ─────────────────────────────────────────

function TextBlock({ data }: { data: any }) {
    return (
        <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/85 leading-relaxed text-justify">
            {data.body}
        </motion.p>
    );
}

function SectionBlock({ data }: { data: any }) {
    return (
        <motion.div variants={fadeUp} className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold font-outfit text-foreground">{data.heading}</h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed text-justify">{data.body}</p>
        </motion.div>
    );
}

function ImageBlock({ data }: { data: any }) {
    return (
        <motion.figure variants={fadeUp} className="space-y-2">
            <div className="relative w-full h-52 md:h-80 rounded-xl overflow-hidden shadow-lg border border-border/30">
                <Image src={data.src} alt={data.alt} fill className="object-cover" />
            </div>
            {data.caption && (
                <figcaption className="text-center text-xs text-muted-foreground italic">{data.caption}</figcaption>
            )}
        </motion.figure>
    );
}

function GalleryBlock({ data }: { data: any }) {
    return (
        <motion.div variants={fadeUp} className="space-y-3">
            {data.heading && <h2 className="text-xl md:text-2xl font-bold font-outfit text-foreground">{data.heading}</h2>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.images?.map((img: any, i: number) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden shadow-md border border-border/30">
                        <Image src={img.src} alt={img.alt ?? ""} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function ListBlock({ data }: { data: any }) {
    return (
        <motion.div variants={fadeUp} className="space-y-3">
            {data.heading && <h2 className="text-xl md:text-2xl font-bold font-outfit text-foreground">{data.heading}</h2>}
            <ul className="space-y-2">
                {data.items?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80 text-base md:text-lg">
                        <span className="mt-2 w-2 h-2 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

function QuoteBlock({ data }: { data: any }) {
    return (
        <motion.blockquote variants={fadeUp} className="border-l-4 border-primary pl-5 py-1 italic text-lg text-foreground/75 leading-relaxed relative">
            <Quote className="absolute -top-2 -left-2 w-5 h-5 text-primary/40" />
            {data.body}
        </motion.blockquote>
    );
}

function CtaBlock({ data }: { data: any }) {
    return (
        <motion.div variants={fadeUp} className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center space-y-4">
            {data.heading && <h3 className="text-xl md:text-2xl font-bold font-outfit text-foreground">{data.heading}</h3>}
            <p className="text-muted-foreground text-base md:text-lg">{data.text}</p>
            <Link href={data.href}>
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all mt-1">
                    {data.label}
                </Button>
            </Link>
        </motion.div>
    );
}

function renderBlock(key: string, block: any) {
    switch (block.type) {
        case "text": return <TextBlock key={key} data={block} />;
        case "section": return <SectionBlock key={key} data={block} />;
        case "image": return <ImageBlock key={key} data={block} />;
        case "gallery": return <GalleryBlock key={key} data={block} />;
        case "list": return <ListBlock key={key} data={block} />;
        case "quote": return <QuoteBlock key={key} data={block} />;
        case "cta": return <CtaBlock key={key} data={block} />;
        default: return null;
    }
}

// ─────────────────────────────────────────
// Minimal Prev / Next
// ─────────────────────────────────────────

function PrevNextNav({ prevPost, nextPost }: { prevPost: any; nextPost: any }) {
    if (!prevPost && !nextPost) return null;
    return (
        <div className="flex items-center justify-between gap-4 pt-2">
            {prevPost ? (
                <Link
                    href={`/blog/${prevPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                </Link>
            ) : <span />}

            {nextPost ? (
                <Link
                    href={`/blog/${nextPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Link>
            ) : <span />}
        </div>
    );
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export default function BlogPostClient({
    post,
    prevPost,
    nextPost,
}: {
    post: any;
    prevPost: any;
    nextPost: any;
}) {
    return (
        <div className="min-h-screen bg-background">

            {/* Full-width Banner Image — no overlay text */}
            <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden">
                <Image
                    src={post.banner}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/5" />
            </div>

            {/* Article Body */}
            <article className="container px-4 max-w-2xl mx-auto py-10 space-y-10">

                {/* Back link */}
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> All Articles
                </Link>

                {/* Title — below banner */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-foreground leading-tight"
                >
                    {post.title}
                </motion.h1>

                {/* Content Blocks */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                    className="space-y-10"
                >
                    {post.order.map((blockKey: string) => {
                        const block = post.content[blockKey];
                        if (!block) return null;
                        return renderBlock(blockKey, block);
                    })}
                </motion.div>

                {/* AEO FAQ Section */}
                {post.seo.aeo?.faqItems?.length > 0 && (
                    <div className="border-t border-border/40 pt-10 space-y-5">
                        <h2 className="text-xl font-bold font-outfit text-foreground">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {post.seo.aeo.faqItems.map((faq: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="bg-white border border-border/50 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                                >
                                    <p className="font-semibold text-foreground font-outfit mb-1.5">{faq.q}</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed text-justify">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags + Date/Author — at the bottom */}
                <div className="border-t border-border/40 pt-8 space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, i: number) => (
                            <span key={i} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                                <Tag className="w-3 h-3" />{tag}
                            </span>
                        ))}
                    </div>
                    {/* Date & Author */}
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <CalendarDays className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <span className="opacity-40">•</span>
                        <span>{post.author}</span>
                    </div>
                </div>

                {/* Prev / Next — pure minimal */}
                <div className="border-t border-border/40 pt-6">
                    <PrevNextNav prevPost={prevPost} nextPost={nextPost} />
                </div>

                {/* Bottom CTA */}
                <div className="bg-foreground rounded-2xl p-7 text-center space-y-3">
                    <h3 className="text-xl font-bold font-outfit text-white">More from FreshPod</h3>
                    <p className="text-white/55 text-sm">Browse more articles or get in touch.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
                        <Link href="/blog">
                            <Button variant="outline" size="sm" className="rounded-full px-6 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                                All Articles
                            </Button>
                        </Link>
                        <Link href="/#contact">
                            <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/30">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>

            </article>
        </div>
    );
}
