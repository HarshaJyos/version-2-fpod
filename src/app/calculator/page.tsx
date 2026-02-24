import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
    title: "Profit Calculator | FreshPod — ROI for Distributors",
    description:
        "Calculate your monthly and yearly profit from FreshPod machines. Enter your machine count, cleaning price, and daily cleans to instantly project your ROI.",
    keywords: [
        "FreshPod profit calculator",
        "helmet cleaning machine ROI",
        "FreshPod distributor earnings",
        "helmet sanitization business India",
        "FreshPod investment return",
    ],
    openGraph: {
        title: "FreshPod ROI Calculator — Project Your Distributor Profits",
        description:
            "Use FreshPod's free profit calculator to project daily, monthly, and yearly income and calculate days to achieve full ROI on your machine investment.",
        url: "https://freshpod.in/calculator",
        siteName: "Freshpod",
        locale: "en_IN",
        type: "website",
    },
    alternates: { canonical: "https://freshpod.in/calculator" },
};

export default function CalculatorPage() {
    return <CalculatorClient />;
}
