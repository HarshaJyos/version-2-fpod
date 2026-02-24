"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Package, CheckCircle2, Globe, MessageCircle } from "lucide-react";
import distributorsData from "@/data/distributors.json";
import internationalData from "@/data/international.json";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
    ssr: false,
    loading: () => <div className="w-full aspect-[2/1] bg-[#0f1729] rounded-3xl animate-pulse" />,
});

const fadeIn: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stateColors: Record<string, string> = {
    "Kerala": "from-green-500/10 to-emerald-500/5 border-green-500/20",
    "Karnataka": "from-red-500/10 to-rose-500/5 border-red-500/20",
    "Tamil Nadu": "from-orange-500/10 to-amber-500/5 border-orange-500/20",
    "Andhra Pradesh": "from-blue-500/10 to-sky-500/5 border-blue-500/20",
    "Telangana": "from-purple-500/10 to-violet-500/5 border-purple-500/20",
    "Maharashtra": "from-yellow-500/10 to-amber-500/5 border-yellow-500/20",
};

const benefits = [
    "Exclusive territory rights",
    "Marketing and sales support",
    "Technical training & onboarding",
    "Competitive margin structure",
    "Regular product updates",
    "Dedicated brand manager",
];

export default function DistributorsClient() {
    return (
        <div className="w-full overflow-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-foreground">
                <div className="absolute inset-0 z-0 bg-cover bg-center opacity-15"
                    style={{ backgroundImage: "url('/images/Machine.png')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/70 to-foreground/90 z-0" />
                <div className="container relative z-10 px-4 text-center py-16 md:py-24">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                        <span className="inline-block bg-primary/20 text-primary font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-5 border border-primary/30">
                            Distribution Network
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-outfit text-white leading-tight max-w-4xl mx-auto mb-4 md:mb-6">
                            Our Distributors
                        </h1>
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-2">
                            Find your nearest FreshPod regional partner, or join India's fastest growing helmet hygiene distribution network.
                        </p>
                        {/* Country badge */}
                        <div className="flex items-center justify-center mt-6">
                            <span className="inline-flex flex-col items-center gap-1.5 bg-primary/20 text-primary font-semibold text-sm px-6 py-3 rounded-2xl border border-primary/30">
                                <span className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Active in {internationalData.length} countr{internationalData.length === 1 ? "y" : "ies"}
                                </span>
                                <span className="text-xl tracking-widest">
                                    {internationalData.map((c: any) => c.flag).join("  ")}
                                </span>
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── INTERNATIONAL PRESENCE ───────────────────────────── */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container px-4">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="text-center mb-10 md:mb-12">
                        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full border border-primary/20 mb-4">
                            <Globe className="w-4 h-4" /> Global Reach
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit text-foreground inline-block relative after:content-[''] after:block after:w-24 after:h-1.5 after:bg-primary after:mx-auto after:mt-4 after:rounded-full">
                            International Presence
                        </h2>
                        <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                            FreshPod is now active across {internationalData.length} countries, with distribution partners in South Asia.
                        </p>
                    </motion.div>

                    {/* World Map */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto mb-10">
                        <WorldMap />
                    </motion.div>

                    {/* Country Cards — 1 col mobile, 2 col sm, 3 col lg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                        {(internationalData as any[]).map((country, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                                <Card className="rounded-2xl border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-5 md:p-6 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-4xl">{country.flag}</span>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${country.status === "Headquartered"
                                                ? "bg-primary/15 text-primary border border-primary/20"
                                                : "bg-blue-50 text-blue-600 border border-blue-200"}`}>
                                                {country.status}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold font-outfit text-foreground">{country.country}</h3>
                                            <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{country.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                                            <Package className="w-4 h-4 flex-shrink-0" />
                                            {country.distributors} distributor{country.distributors > 1 ? "s" : ""}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INDIA STATE-WISE DIRECTORY ───────────────────────── */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container px-4">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit text-foreground inline-block relative after:content-[''] after:block after:w-24 after:h-1.5 after:bg-primary after:mx-auto after:mt-4 after:rounded-full">
                            State-wise Directory
                        </h2>
                        <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                            Connect directly with our authorized distributors in your state.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:gap-10 max-w-6xl mx-auto">
                        {(distributorsData as any[]).map((stateData, si) => (
                            <motion.div key={si} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.6, delay: si * 0.08 }}>

                                {/* State header — wraps gracefully on mobile */}
                                <div className="flex flex-wrap items-center gap-3 mb-5">
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-2xl font-bold font-outfit text-foreground leading-tight">{stateData.state}</h3>
                                            <span className="text-xs text-muted-foreground">{stateData.region}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full border border-primary/20 ml-auto">
                                        {stateData.distributors.length} Distributor{stateData.distributors.length > 1 ? "s" : ""}
                                    </span>
                                    <div className="w-full h-px bg-border/50 mt-1" />
                                </div>

                                {/* Distributor cards — 1 col mobile, 2 col sm+ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {stateData.distributors.map((dist: any, di: number) => (
                                        <Card key={di}
                                            className={`bg-gradient-to-br ${stateColors[stateData.state] || "from-primary/5 to-primary/2 border-primary/20"} border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl`}>
                                            <CardContent className="p-5 space-y-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h4 className="text-base sm:text-xl font-bold font-outfit text-foreground leading-tight">{dist.name}</h4>
                                                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                                            <span className="truncate">{dist.city}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                                                        <Package className="w-4 h-4 text-primary" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <a href={`tel:${dist.phone.replace(/\s/g, "")}`}
                                                        className="flex items-center gap-2 text-primary font-semibold hover:underline group transition-all">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                                                            <Phone className="w-3.5 h-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
                                                        </div>
                                                        <span className="text-sm">{dist.phone}</span>
                                                    </a>
                                                    <p className="text-muted-foreground text-sm pl-10">Coverage: {dist.coverage}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CALCULATOR CTA ───────────────────────────────────── */}
            <section className="py-12 md:py-16 bg-primary/5">
                <div className="container px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto rounded-3xl bg-foreground overflow-hidden shadow-2xl">
                        {/* Stack on mobile, side-by-side on md+ */}
                        <div className="flex flex-col md:grid md:grid-cols-2">
                            <div className="p-7 md:p-10 space-y-4">
                                <span className="inline-block bg-primary/20 text-primary font-semibold text-xs px-3 py-1 rounded-full border border-primary/30">
                                    Free Tool
                                </span>
                                <h2 className="text-xl md:text-3xl font-bold font-outfit text-white">
                                    Calculate Your Profits
                                </h2>
                                <p className="text-white/65 text-sm leading-relaxed">
                                    See exactly how much you can earn per day, month, and year — and how quickly you'll recover your machine investment.
                                </p>
                                <Link href="/calculator">
                                    <Button size="lg" className="rounded-full px-8 mt-2 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all w-full sm:w-auto">
                                        Open ROI Calculator
                                    </Button>
                                </Link>
                            </div>
                            {/* Stats — horizontal on mobile, vertical on md */}
                            <div className="grid grid-cols-3 md:grid-cols-1 divide-x md:divide-x-0 md:divide-y divide-white/10 border-t md:border-t-0 md:border-l border-white/10">
                                {[
                                    { label: "Daily Estimate", sub: "5 machines × ₹50 × 20", value: "₹5,000 / day" },
                                    { label: "Monthly Projection", sub: "", value: "₹1,50,000" },
                                    { label: "ROI Period", sub: "Typical", value: "~100 days" },
                                ].map((stat, i) => (
                                    <div key={i} className="px-4 md:px-8 py-4 md:py-5 text-center md:text-left">
                                        <p className="text-white/45 text-[10px] md:text-xs mb-0.5">{stat.label}</p>
                                        {stat.sub && <p className="text-white/30 text-[9px] hidden md:block mb-0.5">{stat.sub}</p>}
                                        <p className="text-white font-bold font-outfit text-base md:text-xl">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── BECOME A DISTRIBUTOR ─────────────────────────────── */}
            <section className="py-16 md:py-24 bg-white overflow-hidden">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center max-w-5xl mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                            className="space-y-5 md:space-y-6">
                            <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full border border-primary/20">
                                Partnership Opportunity
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-foreground">
                                Become a FreshPod Distributor
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                Join India's fastest growing helmet hygiene brand. As a FreshPod authorized distributor, you get exclusive regional territory, strong margins, and full marketing support to build a profitable business in the booming wellness and safety sector.
                            </p>
                            <ul className="space-y-3">
                                {benefits.map((b, i) => (
                                    <li key={i} className="flex items-center gap-3 text-foreground text-sm md:text-base">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/#contact">
                                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all w-full sm:w-auto">
                                    Apply for Distributorship
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Stats — 2×2 grid always */}
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4 md:gap-5">
                            {[
                                { num: "6+", label: "Active States" },
                                { num: "12+", label: "Distributors" },
                                { num: "100%", label: "Made in India" },
                                { num: "24/7", label: "Partner Support" },
                            ].map((stat, i) => (
                                <Card key={i} className="rounded-2xl border-border/50 hover:border-primary/30 hover:shadow-lg transition-all text-center">
                                    <CardContent className="p-5 md:p-6 space-y-1">
                                        <div className="text-2xl md:text-3xl font-bold font-outfit text-primary">{stat.num}</div>
                                        <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FLOATING WHATSAPP BUTTON ───────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <a
                    href="https://wa.me/7815908571?text=Hi!%20I%20want%20to%20become%20a%20FreshPod%20distributor."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300"
                >
                    <MessageCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold font-outfit text-sm md:text-[15px]">Become a Distributor</span>
                </a>
            </motion.div>

        </div>
    );
}
