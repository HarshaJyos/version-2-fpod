import type { Metadata } from "next";
import DistributorsClient from "./DistributorsClient";

export const metadata: Metadata = {
    title: "Distributors | FreshPod India — Find Your Regional Partner",
    description:
        "Find FreshPod distributors across India. State-wise distributor directory for Kerala, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Maharashtra. Interested in becoming a distributor? Contact us.",
    keywords: [
        "FreshPod distributors India",
        "helmet cleaning machine distributor",
        "FreshPod Kerala",
        "FreshPod Karnataka",
        "FreshPod Tamil Nadu",
        "FreshPod distribution partner",
    ],
    openGraph: {
        title: "FreshPod Distributors | Regional Partners Across India",
        description:
            "Become a FreshPod distributor or find your nearest regional partner. State-wise directory across South India and Maharashtra.",
        url: "https://freshpod.in/distributors",
        siteName: "Freshpod",
        images: [{ url: "https://freshpod.in/images/GOGO.png", width: 1200, height: 630 }],
        locale: "en_IN",
        type: "website",
    },
    alternates: { canonical: "https://freshpod.in/distributors" },
};

export default function DistributorsPage() {
    return <DistributorsClient />;
}
