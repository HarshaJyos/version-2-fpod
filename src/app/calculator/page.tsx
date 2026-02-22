"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, Calculator as CalcIcon } from "lucide-react";
import Image from "next/image";

export default function CalculatorPage() {
    const [machineCost, setMachineCost] = useState<number | "">("");
    const [machines, setMachines] = useState<number | "">("");
    const [cleaningPrice, setCleaningPrice] = useState<number | "">("");
    const [cleansPerDay, setCleansPerDay] = useState<number | "">("");

    const [results, setResults] = useState<{
        daily: number;
        monthly: number;
        yearly: number;
        daysToTarget: string | number;
    } | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!machineCost || !machines || !cleaningPrice || !cleansPerDay) return;

        const daily = Number(machines) * Number(cleaningPrice) * Number(cleansPerDay);
        const monthly = daily * 30;
        const yearly = daily * 365;

        // Avoid division by zero
        const daysToTarget = daily > 0
            ? Math.ceil((Number(machines) * Number(machineCost)) / daily)
            : "Infinity";

        setResults({ daily, monthly, yearly, daysToTarget });
    };

    const handleReset = () => {
        setMachineCost("");
        setMachines("");
        setCleaningPrice("");
        setCleansPerDay("");
        setResults(null);
    };

    return (
        <div className="min-h-[80vh] py-16 bg-background">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-outfit text-foreground mb-4">Profit Calculator</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Calculate your returns by maintaining the machines effectively. Enter the details below to project your potential profit.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                        className="order-2 md:order-1"
                    >
                        <Card className="border-border/50 shadow-xl overflow-hidden bg-white">
                            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-6">
                                <CardTitle className="flex items-center gap-2 text-2xl font-outfit text-foreground">
                                    <CalcIcon className="w-6 h-6 text-primary" />
                                    Your Projections
                                </CardTitle>
                                <CardDescription>Enter parameters to view real-time estimates</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8">
                                <form onSubmit={handleCalculate} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Cost of Machine (₹)</label>
                                        <Input
                                            type="number" min="0" required
                                            value={machineCost} onChange={(e) => setMachineCost(e.target.value ? Number(e.target.value) : "")}
                                            className="py-6 text-lg" placeholder="e.g. 50000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Number of Machines</label>
                                        <Input
                                            type="number" min="1" required
                                            value={machines} onChange={(e) => setMachines(e.target.value ? Number(e.target.value) : "")}
                                            className="py-6 text-lg" placeholder="e.g. 5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Cleaning Price per Helmet (₹)</label>
                                        <Input
                                            type="number" min="0" required
                                            value={cleaningPrice} onChange={(e) => setCleaningPrice(e.target.value ? Number(e.target.value) : "")}
                                            className="py-6 text-lg" placeholder="e.g. 50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Cleans per day (per machine)</label>
                                        <Input
                                            type="number" min="1" required
                                            value={cleansPerDay} onChange={(e) => setCleansPerDay(e.target.value ? Number(e.target.value) : "")}
                                            className="py-6 text-lg" placeholder="e.g. 20"
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" size="lg" className="flex-1 text-lg py-6 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
                                            Calculate
                                        </Button>
                                        <Button type="button" variant="outline" size="lg" onClick={handleReset} className="px-6 py-6 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors">
                                            <RotateCcw className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </form>

                                {results && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}
                                        className="mt-8 p-6 bg-primary/10 rounded-xl space-y-4 border border-primary/20"
                                    >
                                        <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                            <span className="text-muted-foreground font-medium">Daily Income</span>
                                            <span className="text-xl font-bold text-foreground">₹{results.daily.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                            <span className="text-muted-foreground font-medium">Monthly Income</span>
                                            <span className="text-xl font-bold text-foreground">₹{results.monthly.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                            <span className="text-muted-foreground font-medium">Yearly Income</span>
                                            <span className="text-xl font-bold text-primary">₹{results.yearly.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-1">
                                            <span className="text-muted-foreground font-medium">Days to Achieve ROI</span>
                                            <span className="text-xl font-bold bg-foreground text-background px-3 py-1 rounded-full">{results.daysToTarget.toLocaleString()}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
                        className="order-1 md:order-2 flex justify-center"
                    >
                        <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
                            <Image
                                src="/images/profit.jpg"
                                alt="Profit Growth"
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
