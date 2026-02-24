"use client";

import { useState, useEffect, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO numeric codes: India = 356, Nepal = 524, Sri Lanka = 144
const ACTIVE: Record<string, { label: string; flag: string; desc: string }> = {
    "356": { label: "India", flag: "🇮🇳", desc: "Headquartered · 12+ distributors · 6 states" },
    "524": { label: "Nepal", flag: "🇳🇵", desc: "Active · Kathmandu & key urban centres" },
    "144": { label: "Sri Lanka", flag: "🇱🇰", desc: "Active · Colombo · Western Province" },
};

// Marker pins for each country [lng, lat]
const MARKERS = [
    { id: "356", coordinates: [78.9629, 20.5937] as [number, number], label: "India", flag: "🇮🇳" },
    { id: "524", coordinates: [84.1240, 28.3949] as [number, number], label: "Nepal", flag: "🇳🇵" },
    { id: "144", coordinates: [80.7718, 7.8731] as [number, number], label: "Sri Lanka", flag: "🇱🇰" },
];

export default function WorldMap() {
    const [tooltip, setTooltip] = useState<{ label: string; flag: string; desc: string } | null>(null);
    const [geographies, setGeographies] = useState<any[]>([]);

    useEffect(() => {
        fetch(GEO_URL)
            .then(response => response.json())
            .then(topology => {
                const world = feature(topology, topology.objects.countries) as any;
                setGeographies(world.features);
            });
    }, []);

    const width = 800;
    const height = 400;

    const projection = useMemo(() => {
        return geoMercator()
            .scale(140)
            .center([20, 15])
            .translate([width / 2, height / 2]);
    }, []);

    const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

    return (
        <div className="relative w-full rounded-3xl overflow-hidden bg-[#0f1729] shadow-2xl border border-white/10" style={{ aspectRatio: `${width} / ${height}` }}>
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)] pointer-events-none" />

            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto"
            >
                <g>
                    {geographies.map((geo, i) => {
                        const numId = String(geo.id);
                        const active = ACTIVE[numId];
                        return (
                            <path
                                key={`geo-${i}`}
                                d={pathGenerator(geo) || ""}
                                fill={active ? "#6cebf9" : "#1e2d4a"}
                                stroke="#0f1729"
                                strokeWidth={0.4}
                                className={active ? "cursor-pointer hover:fill-[#99f5ffff] transition-colors duration-200" : "opacity-70"}
                                onMouseEnter={() => active && setTooltip(active)}
                                onMouseLeave={() => setTooltip(null)}
                                style={{ outline: "none" }}
                            />
                        );
                    })}

                    {/* Animated pin markers */}
                    {MARKERS.map((m) => {
                        const [x, y] = projection(m.coordinates) || [0, 0];
                        return (
                            <g key={m.id} transform={`translate(${x}, ${y})`}>
                                <circle r={5} fill="#27c0d1ff" stroke="#fff" strokeWidth={1.5} opacity={0.9} />
                                <circle r={10} fill="#27c0d1ff" opacity={0.25}>
                                    <animate attributeName="r" values="6;14;6" dur="2.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
                                </circle>
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-2xl shadow-xl text-center pointer-events-none"
                    >
                        <p className="text-lg font-bold font-outfit">{tooltip.flag} {tooltip.label}</p>
                        <p className="text-xs text-white/70 mt-0.5">{tooltip.desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 text-xs text-white/70">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#27c0d1ff] inline-block" /> Active markets
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#1e2d4a] inline-block" /> Other regions
                </div>
            </div>
        </div>
    );
}
