import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freshpod - India's Best Helmet Sanitizing Machine",
  description: "FreshPod is India's first and best helmet sanitizing machine. A compact, cost-effective, and versatile solution designed to eliminate 99.9% of bacteria, fungi, and odors in minutes using advanced UV and ozone technology.",
  keywords: "FreshPod India, helmet sanitization machine, helmet cleaning machine, India's best helmet cleaner, UV helmet disinfection, helmet hygiene, FreshPod",
  openGraph: {
    title: "Freshpod - India's Best Helmet Sanitizing Machine",
    description: "FreshPod is India's first and best helmet sanitizing machine. Discover the ultimate solution for helmet hygiene, eliminating bacteria, fungi, and odors in minutes.",
    url: "https://freshpod.in",
    siteName: "Freshpod",
    images: [
      {
        url: "https://freshpod.in/images/finalMachine.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshpod - India's Best Helmet Sanitizing Machine",
    description: "FreshPod is India's first and best helmet sanitizing machine, designed to eliminate 99.9% of bacteria and odors.",
    images: ["https://freshpod.in/images/finalMachine.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data setup
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "FreshPod",
      "url": "https://www.freshpod.in",
      "logo": "https://freshpod.in/images/GOGO.png",
      "description": "India's first and best Helmet Sanitizing and Disinfecting Machine. A premium solution for hygiene, eliminating 99.9% of bacteria and odors, and extending helmet life.",
      "areaServed": "India",
      "telephone": "+91-7815908571",
      "email": "hello@freshpod.in"
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Freshpod Helmet Disinfecting Machine",
      "description": "India's best automated machine designed to disinfect, clean, and deodorize helmets in minutes using innovative UV and ozone technology.",
      "brand": {
        "@type": "Brand",
        "name": "FreshPod"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is the best helmet cleaning machine in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FreshPod is widely considered the first and best helmet cleaning machine in India, offering advanced UV and ozone sanitization, fast cleaning cycles, and cost optimization for every rider."
        }
      }, {
        "@type": "Question",
        "name": "Does FreshPod eliminate helmet odor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, FreshPod uses advanced deodorizing systems along with disinfection to completely eliminate odor-causing bacteria and fungi from helmets."
        }
      }]
    }
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="2vqzVdIpcczz7aYuKYSdy-arlr-HYsLLrNbiGYgOWH0" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1 mt-[76px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
