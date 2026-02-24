import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | FreshPod - India's Helmet Sanitizing Machine",
    description:
        "Learn about FreshPod's mission to revolutionize helmet hygiene in India. Designed, manufactured, and deployed proudly under the Viksit Bharat and Atmanirbhar Bharat initiatives.",
    keywords: [
        "FreshPod about",
        "helmet sanitizing machine India",
        "FreshPod company",
        "helmet hygiene company India",
        "Atmanirbhar Bharat",
        "Viksit Bharat",
    ],
    openGraph: {
        title: "About FreshPod | India's Premier Helmet Hygiene Company",
        description:
            "Discover the story behind FreshPod — our vision, mission, and commitment to rider safety and Indian manufacturing excellence.",
        url: "https://freshpod.in/about",
        siteName: "Freshpod",
        images: [{ url: "https://freshpod.in/images/FM_1.png", width: 1200, height: 630 }],
        locale: "en_IN",
        type: "website",
    },
    alternates: { canonical: "https://freshpod.in/about" },
};

export default function AboutPage() {
    return <AboutClient />;
}
