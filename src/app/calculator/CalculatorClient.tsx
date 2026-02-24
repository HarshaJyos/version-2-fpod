"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    RotateCcw, Calculator as CalcIcon,
    TrendingUp, IndianRupee, CalendarDays, Clock, ArrowRight,
} from "lucide-react";

const fmt = (n: number) =>
    "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const fields = [
    { id: "machineCost", label: "Cost of Machine (₹)", placeholder: "e.g. 50000" },
    { id: "machines", label: "Number of Machines", placeholder: "e.g. 5" },
    { id: "cleaningPrice", label: "Cleaning Price per Helmet (₹)", placeholder: "e.g. 50" },
    { id: "cleansPerDay", label: "Cleans per Day (per machine)", placeholder: "e.g. 20" },
] as const;

type FieldId = (typeof fields)[number]["id"];

export default function CalculatorClient() {
    const [values, setValues] = useState<Record<FieldId, string>>({
        machineCost: "", machines: "", cleaningPrice: "", cleansPerDay: "",
    });
    const [results, setResults] = useState<{
        daily: number; monthly: number; yearly: number; daysToROI: number | "∞";
    } | null>(null);

    const set = (id: FieldId) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues((v) => ({ ...v, [id]: e.target.value }));

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        const { machineCost, machines, cleaningPrice, cleansPerDay } = values;
        if (!machineCost || !machines || !cleaningPrice || !cleansPerDay) return;
        const daily = +machines * +cleaningPrice * +cleansPerDay;
        const monthly = daily * 30;
        const yearly = daily * 365;
        const totalCost = +machines * +machineCost;
        const daysToROI = daily > 0 ? Math.ceil(totalCost / daily) : "∞";
        setResults({ daily, monthly, yearly, daysToROI });
    };

    const handleReset = () => {
        setValues({ machineCost: "", machines: "", cleaningPrice: "", cleansPerDay: "" });
        setResults(null);
    };

    const resultCards = results
        ? [
            { label: "Daily Income", value: fmt(results.daily), icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Monthly Income", value: fmt(results.monthly), icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Yearly Income", value: fmt(results.yearly), icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
            { label: "Days to ROI", value: results.daysToROI.toLocaleString(), icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
        ]
        : [];

    return (
        <div className="min-h-screen bg-background">

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="py-20 bg-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,#22c55e_0%,transparent_60%)]" />
                <div className="container px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 bg-primary/20 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-6 border border-primary/30">
                            <CalcIcon className="w-4 h-4" /> For Distributors
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white mb-5">
                            Profit Calculator
                        </h1>
                        <p className="text-base md:text-lg text-white/65 max-w-xl mx-auto">
                            Enter your numbers and instantly see your projected daily, monthly, and yearly returns — plus how fast you'll achieve full ROI.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Calculator Body ───────────────────────────────────── */}
            <section className="py-16">
                <div className="container px-4">

                    {/*
                     * Responsive layout:
                     *   – Mobile/tablet: single column, results appear below form
                     *   – Desktop (lg+): when results exist → side-by-side (form left, results right)
                     */}
                    <motion.div
                        layout
                        className={`mx-auto transition-all duration-500 ${results
                                ? "max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                                : "max-w-xl flex flex-col gap-8"
                            }`}
                    >

                        {/* ── Form ─────────────────────────── */}
                        <motion.div layout="position" transition={{ type: "spring", stiffness: 220, damping: 28 }}>
                            <Card className="rounded-3xl border-border/50 shadow-xl bg-white overflow-hidden">
                                <div className="bg-primary/5 border-b border-primary/10 px-8 py-5 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                                        <CalcIcon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold font-outfit text-foreground text-lg leading-tight">Your Numbers</h2>
                                        <p className="text-muted-foreground text-xs">Fill all fields and press Calculate</p>
                                    </div>
                                </div>
                                <CardContent className="p-8">
                                    <form onSubmit={handleCalculate} className="space-y-5">
                                        {fields.map(({ id, label, placeholder }) => (
                                            <div key={id}>
                                                <label htmlFor={id} className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
                                                <Input
                                                    id={id}
                                                    type="number" min="0" required
                                                    value={values[id]}
                                                    onChange={set(id)}
                                                    placeholder={placeholder}
                                                    className="py-5 text-base rounded-xl border-border/60 focus:border-primary/50"
                                                />
                                            </div>
                                        ))}
                                        <div className="flex gap-3 pt-1">
                                            <Button type="submit" size="lg" className="flex-1 rounded-xl font-semibold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all">
                                                Calculate ROI
                                            </Button>
                                            <Button type="button" variant="outline" size="lg" onClick={handleReset}
                                                className="px-5 rounded-xl hover:border-destructive/40 hover:text-destructive transition-colors"
                                                aria-label="Reset">
                                                <RotateCcw className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* ── Results ──────────────────────── */}
                        <AnimatePresence>
                            {results && (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, x: 32 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 32 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                                    className="flex flex-col gap-4"
                                >
                                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center lg:text-left">
                                        Your Projections
                                    </h2>

                                    {/* Mobile: single column  |  Desktop: 2×2 grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {resultCards.map((card, i) => (
                                            <motion.div
                                                key={card.label}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.08, duration: 0.35 }}
                                            >
                                                <Card className="rounded-2xl border-border/50 hover:shadow-md transition-all">
                                                    <CardContent className="p-5 flex items-center gap-4">
                                                        <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center ${card.bg}`}>
                                                            <card.icon className={`w-5 h-5 ${card.color}`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                                                            <p className={`text-2xl font-bold font-outfit ${card.color} leading-tight`}>{card.value}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <p className="text-center lg:text-left text-xs text-muted-foreground">
                                        * Estimates based on entered values. Actual results may vary.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </div>
            </section>

            {/* ── Bottom CTA ───────────────────────────────────────── */}
            <section className="py-16 bg-primary/5">
                <div className="container px-4 text-center max-w-xl mx-auto space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold font-outfit text-foreground">
                        Ready to Join Our Network?
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Become an authorized FreshPod distributor and start building a profitable business with India's leading helmet hygiene brand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/distributors">
                            <Button size="lg" className="rounded-full px-8 shadow-md shadow-primary/20 hover:-translate-y-1 transition-all">
                                Find Distributors <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/#contact">
                            <Button variant="outline" size="lg" className="rounded-full px-8 hover:-translate-y-1 transition-all">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
