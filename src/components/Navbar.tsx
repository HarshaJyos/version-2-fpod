"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/#home", external: false },
    { label: "About", href: "/about", external: false },
    { label: "Features", href: "/#features", external: false },
    { label: "Blog", href: "/blog", external: false },
    { label: "Distributors", href: "/distributors", external: false },
    { label: "Calculator", href: "/calculator", external: false },
    { label: "Gallery", href: "/gallery", external: false },
    { label: "Contact", href: "/#contact", external: false },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const isActive = (href: string) => {
        if (href.startsWith("/#")) return pathname === "/";
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border/40 py-3"
                : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="relative w-28 h-9 md:w-32 md:h-11 transition-transform hover:scale-105 duration-300">
                            <Image
                                src="/images/GOGO.png"
                                alt="Freshpod India Best Helmet Sanitizing Machine Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                    ? "text-primary bg-primary/8"
                                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="https://wa.me/7815908571"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            WhatsApp Us
                        </a>
                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden flex items-center gap-3">
                        <a
                            href="https://wa.me/7815908571"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            <Phone className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground focus:outline-none p-1"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-border/40 shadow-xl">
                    <div className="container px-4 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive(link.href)
                                    ? "text-primary bg-primary/8"
                                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/7815908571"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md"
                        >
                            <Phone className="w-4 h-4" />
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
