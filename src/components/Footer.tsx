import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div className="flex flex-col items-start space-y-4">
                        <div className="relative w-40 h-16 bg-white rounded-xl p-2">
                            <Image
                                src="/images/GOGO.png"
                                alt="FreshPod Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-muted-foreground max-w-sm mt-4 text-sm leading-relaxed">
                            Premium Helmet Sanitizing and Disinfecting Machine. Revolutionizing hygiene and extending helmet life across India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-xl font-semibold font-outfit text-primary">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link>
                            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link>
                            <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">Features</Link>
                            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</Link>
                            <Link href="/distributors" className="text-muted-foreground hover:text-primary transition-colors text-sm">Distributors</Link>
                            <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gallery</Link>
                            <Link href="/calculator" className="text-muted-foreground hover:text-primary transition-colors text-sm">Calculator</Link>
                            <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-xl font-semibold font-outfit text-primary">Contact Us</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:hello@freshpod.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                                    <Mail className="w-4 h-4 text-primary" />
                                    hello@freshpod.in
                                </a>
                            </li>
                            <li>
                                <a href="tel:+917815908571" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                                    <Phone className="w-4 h-4 text-primary" />
                                    +91 7815908571
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground text-sm">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <a
                                    href="https://maps.app.goo.gl/5oxNUAynSvLa1wjf7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Tanuku, Andhra Pradesh, India
                                </a>
                            </li>
                        </ul>

                        <div className="flex items-center gap-3 mt-2">
                            <a href="https://wa.me/7815908571" target="_blank" rel="noopener noreferrer" className="bg-primary/20 p-2.5 rounded-full hover:bg-primary/40 transition-colors">
                                <Phone className="w-4 h-4 text-primary" />
                            </a>
                            <a href="https://www.instagram.com/freshpod_india?igsh=c25ta2gwMTh2YjRw" target="_blank" rel="noopener noreferrer" className="bg-primary/20 p-2.5 rounded-full hover:bg-primary/40 transition-colors">
                                <Instagram className="w-4 h-4 text-primary" />
                            </a>
                            <a href="https://in.linkedin.com/company/freshpod-india" target="_blank" rel="noopener noreferrer" className="bg-primary/20 p-2.5 rounded-full hover:bg-primary/40 transition-colors">
                                <Linkedin className="w-4 h-4 text-primary" />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-muted-foreground/20 mt-12 pt-6 text-center text-muted-foreground text-xs flex flex-col items-center gap-1">
                    <p>&copy; {new Date().getFullYear()} Freshpod. All Rights Reserved.</p>
                    <p>Designed with <span className="text-red-500">♥</span> in India</p>
                </div>
            </div>
        </footer>
    );
}
