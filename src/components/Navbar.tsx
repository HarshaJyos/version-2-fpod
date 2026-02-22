"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-32 h-10 md:w-36 md:h-12 transition-transform hover:scale-105 duration-300">
                            <Image
                                src="/images/Logo.jpg"
                                alt="Freshpod Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/#home"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/#about"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/#viksit-bharat"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            Viksit Bharat
                        </Link>
                        <Link
                            href="/#features"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/calculator"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/#contact"
                            className="text-foreground/80 hover:text-primary font-medium transition-colors"
                        >
                            Contact
                        </Link>
                        <a
                            href="https://wa.me/7815908571"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                        >
                            <Phone className="w-4 h-4" />
                            WhatsApp Us
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
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
                            className="text-foreground focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background border-b shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col px-4 py-6 space-y-4">
                        <Link
                            href="/#home"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#about"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/#viksit-bharat"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            Viksit Bharat
                        </Link>
                        <Link
                            href="/#features"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/calculator"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/#contact"
                            className="text-foreground hover:text-primary font-medium block"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
