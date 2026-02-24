import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import blogsData from "@/data/blogs.json";

export const metadata: Metadata = {
    title: "Blog | FreshPod — Helmet Hygiene Insights",
    description:
        "Read the latest FreshPod insights on helmet hygiene, rider safety, UV sanitization technology, and fleet management best practices.",
    keywords: ["FreshPod blog", "helmet hygiene blog", "helmet sanitization tips", "rider safety India"],
    openGraph: {
        title: "FreshPod Blog — Insights on Helmet Hygiene & Rider Safety",
        description: "Explore articles on helmet hygiene science, delivery fleet management, and the technology behind FreshPod.",
        url: "https://freshpod.in/blog",
        siteName: "Freshpod",
        locale: "en_IN",
        type: "website",
    },
    alternates: { canonical: "https://freshpod.in/blog" },
};

export default function BlogIndexPage() {
    const blogs = blogsData as any[];
    return <BlogClient blogs={blogs} />;
}
