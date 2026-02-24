"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Target, Eye, Leaf, TrendingUp, Users, ShieldCheck } from "lucide-react";

const fadeIn: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// FM_x images from public/images/
const fmImages = [
    { src: "/images/FM_1.png", alt: "FreshPod Machine - View 1" },
    { src: "/images/FM_2.png", alt: "FreshPod Machine - View 2" },
    { src: "/images/FM_3.png", alt: "FreshPod Machine - View 3" },
    { src: "/images/FM_4.png", alt: "FreshPod Machine - View 4" },
];

const values = [
    { icon: ShieldCheck, title: "Safety First", desc: "Every decision we make is rooted in ensuring the safety and health of every rider who uses our machine." },
    { icon: Leaf, title: "Sustainability", desc: "Our dry UV-ozone process uses zero water, zero chemicals, and produces zero waste — clean science for a cleaner planet." },
    { icon: TrendingUp, title: "Innovation", desc: "We continuously invest in R&D to improve sanitization speed, efficacy, and the overall user experience." },
    { icon: Users, title: "Community", desc: "From individual bikers to delivery fleets, we believe everyone deserves access to professional-grade hygiene." },
];

export default function AboutClient() {
    return (
        <div className="w-full overflow-hidden">

            {/* HERO */}
            <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-foreground">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/images/biker bg.webp')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90" />
                <div className="container relative z-10 px-4 text-center py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <span className="inline-block bg-primary/20 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-5 border border-primary/30">
                            Our Story
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-outfit text-white leading-tight max-w-4xl mx-auto mb-4 md:mb-6">
                            About FreshPod
                        </h1>
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-2">
                            A mission born from a simple truth — every rider deserves a clean, safe helmet.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* STORY + CAROUSEL — matches homepage About section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container px-4">

                    <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                            className="space-y-6 text-lg text-muted-foreground leading-relaxed md:pt-4"
                        >
                            <h3 className="text-2xl font-bold font-outfit text-foreground">Welcome to <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-primary to-green-400">Freshpod!</span></h3>
                            <p>
                                At Freshpod, we are on a mission to redefine hygiene and safety for bikers by revolutionizing the way helmets are cleaned and maintained. Our journey began with a simple yet powerful idea—to provide a quick, effective, and accessible solution for helmet cleanliness.
                            </p>
                            <p>
                                Our flagship product, the Freshpod Helmet Disinfectant Machine, embodies this mission. It is a revolutionary innovation designed to ensure your helmet stays fresh, sanitized, and safe.
                            </p>
                            <p>
                                Our commitment is not only to individual bikers but also to businesses that depend on helmets daily. Freshpod is compact, cost-effective, and versatile — perfect for rideshare companies, delivery hubs, and bike rental services.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                            className="w-full mx-auto max-w-xs md:max-w-none"
                        >
                            <InfiniteCarousel
                                images={fmImages}
                                interval={3200}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* MISSION & VISION */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit text-foreground inline-block relative after:content-[''] after:block after:w-24 after:h-1.5 after:bg-primary after:mx-auto after:mt-4 after:rounded-full">
                            Mission & Vision
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                icon: Target,
                                title: "Our Mission",
                                body: "To make professional helmet hygiene accessible to every rider in India — from individual bikers to large-scale delivery fleets — through innovative, safe, and affordable sanitization technology manufactured entirely in India.",
                            },
                            {
                                icon: Eye,
                                title: "Our Vision",
                                body: "A future where no rider ever has to compromise on hygiene or safety. We envision FreshPod machines at every fuel station, delivery hub, bike showroom, and rental service across the country — setting a new national standard for rider health.",
                            },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}>
                                <Card className="h-full border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group rounded-2xl">
                                    <CardContent className="p-6 md:p-8 space-y-4">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold font-outfit text-foreground">{item.title}</h3>
                                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{item.body}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR VALUES */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container px-4">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit text-foreground inline-block relative after:content-[''] after:block after:w-24 after:h-1.5 after:bg-primary after:mx-auto after:mt-4 after:rounded-full">
                            Our Values
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
                        {values.map((v, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                                <Card className="h-full border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group rounded-2xl text-center">
                                    <CardContent className="p-6 md:p-8 flex flex-col items-center space-y-3 md:space-y-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                            <v.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold font-outfit text-foreground">{v.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm text-center">{v.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIKSIT BHARAT */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-white flex items-center justify-center min-h-[40vh]">
                <div
                    className="absolute inset-0 z-0 opacity-50 w-full bg-center bg-no-repeat bg-[length:auto_100%] md:bg-[length:100%_100%]"
                    style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-white/95 z-0" />
                <div className="container px-4 relative z-10">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit text-foreground mb-6 md:mb-10 drop-shadow-sm">
                            🇮🇳 Viksit Bharat
                        </h2>
                        <Card className="bg-white/70 backdrop-blur-xl border-white/50 shadow-2xl p-6 sm:p-8 md:p-12 hover:shadow-primary/20 transition-all duration-500 rounded-3xl">
                            <p className="text-base sm:text-xl md:text-2xl text-foreground leading-relaxed mb-6 md:mb-8 font-medium text-center">
                                Freshpod is not just a product; it's a symbol of innovation and self-reliance. Designed, developed, and manufactured entirely in India, we take pride in supporting the <strong>Viksit Bharat</strong> and <strong>Atmanirbhar Bharat</strong> initiatives.
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 md:mb-8 rounded-full" />
                            <p className="text-sm sm:text-base md:text-xl text-muted-foreground leading-relaxed text-center">
                                By choosing Freshpod, you are ensuring hygiene and safety while contributing to India's growing manufacturing ecosystem. Together, we build a cleaner, safer, and self-sufficient future.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary/5">
                <div className="container px-4 text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit text-foreground">Ready to Experience FreshPod?</h2>
                        <p className="text-muted-foreground text-lg">Speak with our team about deployment, pricing, or distributorship.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#contact">
                                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
                                    Contact Us
                                </Button>
                            </Link>
                            <Link href="/distributors">
                                <Button variant="outline" size="lg" className="rounded-full px-8 hover:-translate-y-1 transition-all">
                                    Find a Distributor
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
