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
  metadataBase: new URL("https://freshpod.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: "Freshpod - India's Best Helmet Sanitizing Machine",
  description: "FreshPod is India's first and best helmet sanitizing machine. A compact, cost-effective, and versatile solution designed to eliminate 99.9% of bacteria, fungi, and odors in minutes using advanced UV and ozone technology.",
  keywords: "FreshPod, fresh pod, fpod, freshpod india, fresh pod india, helmet sanitizing machine, helmet sanitization machine, helmet cleaning machine, helmet sanitizqtion, hemet cleaning, helmet clening, cleaning, sanitization, sanitise, sanitize, sanitizing, wash, washing, disinfection, disinfect, sterilization, sterilize, sterilizer, helmet, helmets, motorcycle helmet, bike helmet, riding gear, helmet care, helmet hygiene, helmet maintenance, helmet spa, helmet interior cleaner, helmet padding wash, helmet liner cleaning, helmet foam cleaner, helmet deodorizer, helmet freshener, remove helmet smell, helmet odor removal, smelly helmet solution, sweaty helmet fix, dirty helmet, helmet sweat, helmet dirt, virus, bacteria, germs, fungi, mold, helmet diseases, head itching, head itching from helmet, head acne, scalp acne, helmet acne, folliculitis from helmet, dandruff from helmet, hair loss helmet, hair fall helmet, scalp infection riding, helmet rash, bacteria in helmet, virus in helmet, helmet health risks, helmet allergy, dust allergy from helmet, sinus from helmet, helmet sickness, helmet headache, helmet lice, remove lice from helmet, helmet bed bugs, helmet mites, dry wash, dry helmet wash, chemical free helmet wash, uv helmet cleaner, ozone helmet cleaner, uv-c helmet disinfection, helmet dryer, 3 minute helmet wash, fast helmet wash, quick helmet cleaning, automatic helmet cleaner, smart helmet cleaner, helmet cleaning device, premium helmet cleaning, best helmet cleaner india, first helmet sanitizing machine india, shieldx alternative, helmet cleaning kiosk, helmet cleaning franchise, helmet cleaning business, b2b helmet cleaning, bike rental helmet hygiene, delivery partner helmet cleaning, zomato rider helmet, swiggy rider helmet, rapido rider hygiene, uber moto helmet care, ola bike helmet, daily commuter helmet, rider safety, rider health, hygiene standards, helmet sanitizing station, motorcycle detailing, bike spa setup, helmet care products, business ideas for bikers, freshpod sanitization, freshpod cleaning equipment, smart hygiene locker, automated hygiene machine, fresh pod helmet cleaner, best helmet sanitiser, helmet sanitisation, helmet sterilising, helmet care india, rider wellness",
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
      "image": [
        "https://freshpod.in/images/finalMachine.png",
        "https://freshpod.in/images/FM_1.png"
      ],
      "description": "India's first and best Helmet Sanitizing and Disinfecting Machine. A premium solution for hygiene, eliminating 99.9% of bacteria and odors, and extending helmet life.",
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "telephone": "+91-7815908571",
      "email": "hello@freshpod.in",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Freshpod Helmet Disinfecting Machine",
      "description": "India's best automated machine designed to disinfect, clean, and deodorize helmets in minutes using innovative UV and ozone technology.",
      "image": "https://freshpod.in/images/finalMachine.png",
      "brand": {
        "@type": "Brand",
        "name": "FreshPod"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Motorcycle Riders, Delivery Partners, Bike Rental Services"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://freshpod.in/#contact",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "125"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Krishna Rokkm"
          },
          "reviewBody": "Helmet smells incredibly good after cleaning in Freshpod. It's a game changer for daily riders like me."
        }
      ]
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
          "text": "Yes, FreshPod uses advanced deodorizing systems along with dry UV-C and ozone disinfection to completely eliminate odor-causing bacteria and fungi from helmets."
        }
      }, {
        "@type": "Question",
        "name": "Is FreshPod safe for helmet interiors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. FreshPod uses a 100% dry wash process with UV-C and ozone, ensuring no water or harsh chemicals damage the protective EPS foam or inner liners."
        }
      }, {
        "@type": "Question",
        "name": "How long does a FreshPod sanitization cycle take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A complete FreshPod sanitization cycle takes just 3 to 5 minutes to deliver a fully disinfected, deodorized, and ready-to-use helmet."
        }
      }]
    }
  ];

  return (
    <html lang="en" data-scroll-behavior="smooth">
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
