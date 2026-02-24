import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
    title: "Gallery | FreshPod — Helmet Sanitizing Machine Images",
    description:
        "Browse the FreshPod gallery — product views, field deployments, sanitization technology, and real-world use cases of India's premier helmet hygiene machine.",
    keywords: [
        "FreshPod gallery",
        "helmet sanitizing machine images",
        "UV helmet cleaner India",
        "helmet disinfection machine photos",
        "FreshPod product images",
        "helmet hygiene India",
    ],
    openGraph: {
        title: "FreshPod Gallery — Helmet Sanitizing Machine in Action",
        description:
            "See FreshPod's UV-C and ozone helmet sanitizing machine up close — product shots, features, and deployment images from across India.",
        url: "https://freshpod.in/gallery",
        siteName: "Freshpod",
        images: [
            {
                url: "https://freshpod.in/images/FM_1.png",
                width: 1200,
                height: 1500,
                alt: "FreshPod Helmet Sanitizing Machine",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FreshPod Gallery — Helmet Sanitizing Machine in Action",
        description:
            "See FreshPod's UV-C and ozone helmet sanitizing machine up close — product shots, features, and deployment images from across India.",
        images: ["https://freshpod.in/images/FM_1.png"],
    },
    alternates: { canonical: "https://freshpod.in/gallery" },
    other: {
        "geo.region": "IN-AP",
        "geo.placename": "Tanuku, Andhra Pradesh",
        "geo.position": "16.7500;81.6833",
        ICBM: "16.7500, 81.6833",
    },
};

// JSON-LD: ImageGallery + LocalBusiness association
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "FreshPod Product Gallery",
    description:
        "Official image gallery of FreshPod — India's premier UV-C and ozone helmet sanitizing machine. View product photos, features, and field deployments.",
    url: "https://freshpod.in/gallery",
    publisher: {
        "@type": "Organization",
        name: "FreshPod",
        url: "https://freshpod.in",
        logo: {
            "@type": "ImageObject",
            url: "https://freshpod.in/images/GOGO.png",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Tanuku",
            addressRegion: "Andhra Pradesh",
            addressCountry: "IN",
        },
    },
    image: [
        "https://freshpod.in/images/FM_1.png",
        "https://freshpod.in/images/FM_2.png",
        "https://freshpod.in/images/FM_3.png",
        "https://freshpod.in/images/FM_4.png",
    ],
    inLanguage: "en-IN",
};

export default function GalleryPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GalleryClient />
        </>
    );
}
